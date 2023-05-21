import CategoryModels from "../models/CategoryModels.js";
import slugify from "slugify";

export const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is Required" });
    }
    const existingCategory = await CategoryModels.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exist",
      });
    }
    const category = await new CategoryModels({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

///Upadte Category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModels.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updates Succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//Get All Category

export const getallCategoryController = async (req, res) => {
  try {
    const category = await CategoryModels.find({});
    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Getting All Categories",
    });
  }
};

// Single Category Controller
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModels.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category Succcessfrully",
      category,
    });
  } catch (error) {
    console.log(error);
    req.satus(500).send({
      success: false,
      message: " Erroe While Getting Single Category",
      error,
    });
  }
};

//Delete Category Controller

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModels.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Catergory Delete Successfully",
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      message: "Error In Category Deletation",
      error,
    });
  }
};
