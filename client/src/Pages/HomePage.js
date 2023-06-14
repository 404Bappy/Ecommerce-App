import axios from "axios";
import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../context/auth";

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  // GET_PRODUCTS
  const getAllProducts = async () => {

    try {
      const {data} = await axios.get('/api/v1/product')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Productsc - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            <h1>Products</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
