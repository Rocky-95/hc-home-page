import productService from "../services/productService";
import apiClient from "../services/apiClient";

jest.mock("../services/apiClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe("productService", () => {
  afterEach(() => jest.clearAllMocks());

  it("fetches products with params", async () => {
    const params = { category: "suits" };
    apiClient.get.mockResolvedValue({ data: { data: [] } });
    await productService.getProducts(params);
    expect(apiClient.get).toHaveBeenCalledWith("/Products", { params });
  });

  it("fetches product media", async () => {
    apiClient.get.mockResolvedValue({ data: { data: [] } });
    await productService.getProductMedia();
    expect(apiClient.get).toHaveBeenCalledWith("/Products-Media");
  });

  it("fetches product sizes", async () => {
    apiClient.get.mockResolvedValue({ data: { data: [] } });
    await productService.getProductSizes();
    expect(apiClient.get).toHaveBeenCalledWith("/Products-Sizes");
  });

  it("fetches menu categories", async () => {
    apiClient.get.mockResolvedValue({ data: { data: [] } });
    await productService.getMenuCategories();
    expect(apiClient.get).toHaveBeenCalledWith("/Menu-Category");
  });
});
