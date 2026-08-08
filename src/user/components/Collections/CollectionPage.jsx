import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { products as fallbackProducts } from "../../../shared/assets/json/tuxedoProducts";
import "../../styles/CollectionPage.css";
import productService from "../../../services/productService";
import ProductFilters from "../ProductFilters";

const placeholderImage = "https://via.placeholder.com/400x500?text=No+Image";

const CollectionPage = ({
  category,
  title,
  eyebrow,
  description,
  bannerImage,
}) => {
  const [collectionMeta, setCollectionMeta] = useState({ title, eyebrow, description, bannerImage });
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [clothTypes, setClothTypes] = useState([]);
  const [filters, setFilters] = useState({
    size: "",
    clothType: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [collectionsRes, mediaRes] = await Promise.allSettled([
          productService.getStyleCollections(),
          productService.getStyleCollectionMedia(),
        ]);
        const collections = collectionsRes.status === "fulfilled" ? (collectionsRes.value.data?.data || collectionsRes.value.data || []) : [];
        const media = mediaRes.status === "fulfilled" ? (mediaRes.value.data?.data || mediaRes.value.data || []) : [];

        const matched = collections.find((sc) =>
          (sc.style_collection_slug || sc.style_collection_name?.toLowerCase().replace(/\s+/g, "-")) === category
        );

        if (matched) {
          const matchedMedia =
            media.find((m) => m.style_collection_id === matched.style_collection_id && m.isprimary) ||
            media.find((m) => m.style_collection_id === matched.style_collection_id);
          setCollectionMeta({
            title: matched.title || matched.style_collection_name || title,
            eyebrow: matched.eyebrow || matched.eyebrow_text || matched.subtitle || eyebrow,
            description: matched.description || matched.short_description || description,
            bannerImage: matchedMedia?.media_url || matched.banner_image_url || matched.image_url || bannerImage,
          });
        }
      } catch {
        // keep hardcoded props as fallback
      }
    };
    fetchMeta();
  }, [category, title, eyebrow, description, bannerImage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.allSettled([
          productService.getProducts({ category }),
          productService.getProductMedia(),
          productService.getProductVariants(),
          productService.getProductAttributeValues(),
          productService.getProductAttributes(),
          productService.getProductSizes(),
          productService.getProductClothTypes(),
        ]);
        const getData = (i) =>
          responses[i].status === "fulfilled"
            ? responses[i].value.data?.data || responses[i].value.data || []
            : [];
        const apiProducts = getData(0);
        const apiMedia = getData(1);
        const mapped = apiProducts
          .filter((p) => !category || (p.category || "").toLowerCase() === category.toLowerCase())
          .map((p) => {
            const media = apiMedia.find(
              (m) =>
                m.product_id === p.product_id &&
                m.isprimary === true
            );
            return {
              id: p.product_id || p.product_slug,
              product_id: p.product_id,
              name: p.product_name,
              category: p.category || category,
              description: p.short_description || p.description || "",
              price: p.base_price || 0,
              originalPrice: null,
              image: media?.media_url || placeholderImage,
              subtitle: p.product_slug
                ?.split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ") || "",
              colors: [],
            };
          });
        setProducts(mapped.length > 0 ? mapped : fallbackProducts.filter((p) => p.category === category));
        setVariants(getData(2));
        setAttributeValues(getData(3));
        setAttributes(getData(4));
        setSizes(getData(5));
        setClothTypes(getData(6));
      } catch (err) {
        setError("Unable to load products from the server.");
        setProducts(fallbackProducts.filter((p) => p.category === category));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const colorAttributeId = useMemo(() => {
    return attributes.find((a) => a.attribute_slug?.toLowerCase() === "color" || a.attribute_name?.toLowerCase() === "color")?.attribute_id;
  }, [attributes]);

  const availableColors = useMemo(() => {
    if (!colorAttributeId) return [];
    const values = attributeValues
      .filter((av) => av.attribute_id === colorAttributeId)
      .map((av) => av.attribute_value);
    return [...new Set(values)].filter(Boolean);
  }, [attributeValues, colorAttributeId]);

  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  useEffect(() => {
    document.title = `${collectionMeta.title} | Harry Clinton`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", collectionMeta.description || "");
  }, [collectionMeta]);

  const collectionProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      if (!(!category || product.category === category)) return false;
      if (normalizedSearch &&
          !product.name?.toLowerCase().includes(normalizedSearch) &&
          !product.description?.toLowerCase().includes(normalizedSearch)) return false;

      const productVariants = variants.filter((v) => v.product_id === product.product_id);

      if (filters.size) {
        const hasSize = productVariants.some((v) => v.size_id === filters.size || v.size_id === sizes.find((s) => s.size_name === filters.size)?.size_id);
        if (!hasSize) return false;
      }

      if (filters.clothType) {
        const hasCloth = productVariants.some((v) => v.cloth_type_id === filters.clothType || v.cloth_type_id === clothTypes.find((ct) => ct.cloth_type_name === filters.clothType)?.cloth_type_id);
        if (!hasCloth) return false;
      }

      if (filters.color) {
        const hasColor = attributeValues.some(
          (av) =>
            av.product_id === product.product_id &&
            av.attribute_value?.toLowerCase() === filters.color.toLowerCase() &&
            (!colorAttributeId || av.attribute_id === colorAttributeId)
        );
        if (!hasColor) return false;
      }

      const price = product.price || 0;
      if (filters.minPrice && price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && price > Number(filters.maxPrice)) return false;

      return true;
    });
  }, [category, products, searchTerm, variants, attributeValues, sizes, clothTypes, colorAttributeId, filters]);

  return (
    <main className="collection-page">
      <section className="collection-hero">
        <img src={collectionMeta.bannerImage} alt="" className="collection-hero__image" />
        <div className="collection-hero__overlay" />
        <div className="collection-hero__content">
          <span>{collectionMeta.eyebrow}</span>
          <h1>{collectionMeta.title}</h1>
          <p>{collectionMeta.description}</p>
          <a href="#collection-products" className="collection-hero__action">
            Explore collection <FaArrowRight />
          </a>
        </div>
      </section>

      <section className="collection-catalog" id="collection-products">
        <div className="collection-catalog__heading">
          <div>
            <span className="collection-kicker">Curated by House of Cavani</span>
            <h2>{collectionMeta.title}</h2>
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

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-warning text-center">{error}</div>
        )}

        {!loading && (
          <div className="row">
            <div className="col-lg-3 mb-4">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                sizes={sizes}
                clothTypes={clothTypes}
                colors={availableColors}
                priceRange={priceRange}
              />
            </div>
            <div className="col-lg-9">
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
                    <span>Rs. {(product.price || 0).toLocaleString("en-IN")}</span>
                    {product.originalPrice && (
                      <del>
                        Rs. {(product.originalPrice || 0).toLocaleString("en-IN")}
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
            No pieces match your filters or search.
          </div>
        )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CollectionPage;
