import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../Components/Price";

function HomePage() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //GET ALL CATEGORY//
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getall-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // GET_PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  //FILTER BY CATEGORY//
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //GET FILTERED PRODUCTS//
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Productsc - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center mt-4 ">Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* FILTER BY PRICES  */}
          <h4 className="text-center mt-4 ">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RSET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p
                    className="card-text text-bolder"
                    style={{ color: "#ff4081", fontWight: "bold" }}
                  >
                    $ {p.price}
                  </p>
                  <button
                    style={{ backgroundColor: "#689f38", color: "white" }}
                    class="btn  ms-1"
                  >
                    More Details
                  </button>
                  <button sty class="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
