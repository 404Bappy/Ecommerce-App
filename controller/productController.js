import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import router from "../routes/productRoutes.js";
import { type } from "os";

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

export const updateProductController = async (req, res) => {
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
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated SccessFully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Products",
    });
  }
};

// FILTERS//
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

//Product Count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

//PRODUCT LIST BASE ON PAGE //
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products, 
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page control",
      error,
    });
  }
};
