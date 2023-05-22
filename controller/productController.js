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
export const getProductController = () => {};
