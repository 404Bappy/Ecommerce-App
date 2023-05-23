import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import router from "../routes/productRoutes.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    //Validation//
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name Is Required" });
      case !description:
        return res.status(500).send({ error: "Discription Is Required" });
      case !price:
        return res.status(500).send({ error: "Price Is Required" });
      case !category:
        return res.status(500).send({ error: "Category Is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity Is Required" });
      case photo: //&& photo.size > 10000
        return res
          .status(500)
          .send({ error: "Photo Is Required and Should Be Less Then 1 MB" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created SccessFully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Creating Products",
    });
  }
};

// Get All Products//
export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: product.length,
      message: "AllProducts",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error is Getting Product",
      error,
    });
  }
};

///=====>> GET single Product <<=============//
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fatched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Gertting Single Product",
      error,
    });
  }
};

//Get Photo Controller//

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting the Product Photo",
      error,
    });
  }
};

//Delete Product Controller//
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Deleting Product",
      error,
    });
  }
};

//UPDATE Product Controller //

export const updateProductController = () => {};
