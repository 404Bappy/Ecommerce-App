import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";

const Product = () => {
  const [product, setProduct] = useState([]);

  //GET ALL PRODUCT//
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  //   LIFE Cycle METHOD //

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>
          {
              
          }
        </div>
      </div>
    </Layout>
  );
};

export default Product;
