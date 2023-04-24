import cartData from "../db/cartData.json";
import productData from "../db/productData.json";
import userData from "../db/userData.json";

import {
  fetchUserData,
  fetchProductData,
  fetchCartsData,
} from "../functions.js";

global.fetch = jest.fn((url) => {
  let result;
  switch (url) {
    case "https://fakestoreapi.com/users":
      result = userData;
      break;
    case "https://fakestoreapi.com/products":
      result = productData;
      break;
    case "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07":
      result = cartData;
      break;
    default:
      result = "";
  }
  return Promise.resolve({
    json: () => Promise.resolve(result),
  });
});

describe("", () => {
  it("should fetch users data", async () => {
    const result = await fetchUserData();
    expect(result).toEqual(userData);
  });
  it("should fetch product data", async () => {
    const result = await fetchProductData();
    expect(result).toEqual(productData);
  });
  it("should fetch cart data", async () => {
    const result = await fetchCartsData();
    expect(result).toEqual(cartData);
  });
});
