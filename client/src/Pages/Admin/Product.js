import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";

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
        <div className="col-md-9 ">
          <h1 className="text-center">All Product List</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                <div className="card m-2" style={{ width: "18rem" }} >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
