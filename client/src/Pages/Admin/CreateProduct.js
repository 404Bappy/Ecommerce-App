import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");

  //Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getall-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong Getting Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="SELECT A CATEGORY"
                size="large"
                showSearch className="form-select mb-3" onChange={(value) =>{setCategory(value)}}
              >
                {categories?.map(c =>(
                  <Option key={c.id} value={c.name}>{c.name}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
