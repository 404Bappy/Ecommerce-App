import Layout from "../Components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Rasults"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
};

export default Search;
