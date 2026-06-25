import apiClient from "./apiClient";

const productService = {
  // Menu categories
  getMenuCategories: () => apiClient.get("/Menu-Category"),
  getMenuCategoryById: (id) => apiClient.get(`/Menu-Category/${id}`),

  getMenuSubCategories: () => apiClient.get("/Menu-Sub-Category"),
  getMenuSubCategoryById: (id) => apiClient.get(`/Menu-Sub-Category/${id}`),

  // Products
  getProducts: (params) => apiClient.get("/Products", { params }),
  getProductById: (id) => apiClient.get(`/Products/${id}`),

  // Product related
  getProductMedia: (params) => apiClient.get("/Products-Media", { params }),
  getProductSeo: (params) => apiClient.get("/Products-Seo", { params }),
  getProductClothTypes: () => apiClient.get("/Products-Cloth-Types"),
  getProductSizes: () => apiClient.get("/Products-Sizes"),
  getProductAttributes: () => apiClient.get("/Products-Attributes"),
  getProductAttributeValues: () => apiClient.get("/Products-Attributes-Values"),
  getProductVariants: () => apiClient.get("/Products-Variants"),

  // Style collections
  getStyleCollections: () => apiClient.get("/Style-Collections"),
  getStyleCollectionById: (id) => apiClient.get(`/Style-Collections/${id}`),
  getStyleCollectionMedia: () => apiClient.get("/Style-Collection-Media"),

  // Spotlight
  getSpotlightEntries: () => apiClient.get("/Spotlight-Entries"),
  getSpotlightMedia: () => apiClient.get("/Spotlight-Media"),

  // Image sliders
  getImageSliders: () => apiClient.get("/Image-Sliders"),

  // Running bars
  getRunningBars: () => apiClient.get("/Running-Bar"),
  getRunningBarItems: () => apiClient.get("/Running-Bar-Items"),

  // Menu video
  getMenuVideos: () => apiClient.get("/Menu-Video"),

  // Reviews
  getReviews: () => apiClient.get("/reviews"),
  getReviewById: (id) => apiClient.get(`/reviews/${id}`),
  getProductRatingSummary: () => apiClient.get("/product-rating-summary"),
  getVariantRatingSummary: () => apiClient.get("/variant-rating-summary"),
};

export default productService;
