import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
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
      case photo && photo.size > 10000:
        return res
          .status(500)
          .send({ error: "Photo Is Required and Should Be Less Then 1 MB" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Creating Products",
    });
  }
};
