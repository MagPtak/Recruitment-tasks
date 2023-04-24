import {
  getCategories,
  findCartWithMAxValue,
  findLongestDistance,
  printPrice,
  countProductPrice,
} from "../functions.js";
import productData from "../db/productData.json";
import cartData from "../db/cartData.json";
import userData from "../db/userData.json";

describe("", () => {
  it("should count product price properly", () => {
    const result = countProductPrice(1, 3, productData);
    expect(result).toBe(329.85);
  });
  it("should throw product not found Error", () => {
    let errorResult = null;
    try {
      countProductPrice(21, 3, productData);
    } catch (e) {
      errorResult = e;
    }
    expect(errorResult.message).toBe("Product not found");
  });
});

describe("", () => {
  it("should cointain a given category", () => {
    const result = getCategories(productData);
    expect(result).toContain(
      "women's clothing",
      "electronics",
      "jewelery",
      "men's clothing"
    );
  });
});

describe("", () => {
  it("should print total price for every category", () => {
    const result = printPrice("men's clothing", productData);
    expect(result.Price).toEqual("204.23");
    expect(result.Category).toEqual("men's clothing");
  });
});

describe("", () => {
  it("should find a cart with the highest value", () => {
    const result = findCartWithMAxValue(cartData, productData);
    expect(result.id).toEqual(2);
    expect(result.userId).toEqual(1);
    expect(result.price).toEqual(2578.7);
  });
});

describe("", () => {
  it("should find the longest distance between two users", () => {
    const result = findLongestDistance(userData);
    console.log(result);
    expect(result.maxDistance).toEqual(15011);
    expect(result.user1.firstname).toEqual("john");
    expect(result.user1.lastname).toEqual("doe");
    expect(result.user2.firstname).toEqual("derek");
    expect(result.user2.lastname).toEqual("powell");
  });
});
