import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="container py-5 text-center">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h1 className="display-1">404</h1>
        <p className="lead mb-4">We couldn't find the page you were looking for.</p>
        <Link className="btn btn-dark" to="/">
          Go back to Home
        </Link>
      </div>
    </div>
  </main>
);

export default NotFound;
