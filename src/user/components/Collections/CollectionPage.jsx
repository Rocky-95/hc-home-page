import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { products } from "../../../shared/assets/json/tuxedoProducts";
import "../../styles/CollectionPage.css";

const CollectionPage = ({
  category,
  title,
  eyebrow,
  description,
  bannerImage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const collectionProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter(
      (product) =>
        product.category === category &&
        (!normalizedSearch ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch))
    );
  }, [category, searchTerm]);

  return (
    <main className="collection-page">
      <section className="collection-hero">
        <img src={bannerImage} alt="" className="collection-hero__image" />
        <div className="collection-hero__overlay" />
        <div className="collection-hero__content">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <a href="#collection-products" className="collection-hero__action">
            Explore collection <FaArrowRight />
          </a>
        </div>
      </section>

      <section className="collection-catalog" id="collection-products">
        <div className="collection-catalog__heading">
          <div>
            <span className="collection-kicker">Curated by House of Cavani</span>
            <h2>{title}</h2>
          </div>

          <label className="collection-search">
            <FaSearch aria-hidden="true" />
            <span className="visually-hidden">Search this collection</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search collection"
            />
          </label>
        </div>

        <div className="collection-result-count">
          {collectionProducts.length}{" "}
          {collectionProducts.length === 1 ? "piece" : "pieces"}
        </div>

        {collectionProducts.length > 0 ? (
          <div className="collection-grid">
            {collectionProducts.map((product) => (
              <Link
                to={`/collections/product/${encodeURIComponent(product.id)}`}
                className="collection-card"
                key={product.id}
              >
                <div className="collection-card__image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="collection-card__image"
                    loading="lazy"
                  />
                  <span className="collection-card__view">
                    View piece <FaArrowRight />
                  </span>
                </div>

                <div className="collection-card__body">
                  <div>
                    <span className="collection-card__subtitle">
                      {product.subtitle}
                    </span>
                    <h3>{product.name}</h3>
                  </div>
                  <div className="collection-card__price">
                    <span>Rs. {product.price.toLocaleString("en-IN")}</span>
                    {product.originalPrice && (
                      <del>
                        Rs. {product.originalPrice.toLocaleString("en-IN")}
                      </del>
                    )}
                  </div>
                  <div className="collection-card__swatches">
                    {product.colors.slice(0, 4).map((color) => (
                      <span
                        key={color.id}
                        title={color.label}
                        style={{
                          backgroundColor: color.hex,
                          borderColor: color.border || "#b8b8b8",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="collection-empty">
            No pieces match "{searchTerm}".
          </div>
        )}
      </section>
    </main>
  );
};

export default CollectionPage;
