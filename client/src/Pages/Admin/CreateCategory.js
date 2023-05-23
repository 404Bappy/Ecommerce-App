import axios from "axios";
import { get } from "mongoose";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  //Get All Categories//
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data);
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
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1>Create CreateCategory</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
