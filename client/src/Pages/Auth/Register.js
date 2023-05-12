import React from "react";
import Layout from "../../Components/Layout/Layout";

const Register = () => {
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="register">
        <h1>fhdfsghdsghsdghgdfh</h1>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-3">
           
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mb-3">
           
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="mb-3">
           
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Address"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
