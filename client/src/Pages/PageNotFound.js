import React from "react";
import Layout from "../Components/Layout/Layout";

function PageNotFound() {
  return (
    <Layout title={'Page Not Found'}>
      <h1>Page not Found</h1>

      <>
        <div className="container">
          <h1>404</h1>
          <p>Oops! The page you are looking for cannot be found.</p>
          <a href="#">Go back to home</a>
        </div>
      </>
    </Layout>
  );
}

export default PageNotFound;
