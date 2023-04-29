import React from "react";
import "./pagenotfound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="not-found-container">
      <h1 className="not-found-header">Sorry, couldn't find this page</h1>
      <p className="not-found-text">
        If logged in go to
        <Link className="link" to="/dash">
          Welcome
        </Link>{" "}
        . Else{" "}
        <Link className="link" to="/">
          Log In
        </Link>
      </p>
    </section>
  );
};

export default PageNotFound;