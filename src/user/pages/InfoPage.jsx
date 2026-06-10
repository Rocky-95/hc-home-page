import React from "react";
import { Link } from "react-router-dom";

const InfoPage = ({ title, description, details = [], action }) => {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">{title}</h1>
          <p className="lead">{description}</p>
          {details.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
          {action && (
            <div className="mt-4">
              <Link className="btn btn-dark" to={action.to}>
                {action.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default InfoPage;
