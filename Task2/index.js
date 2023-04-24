import {
  fetchUserData,
  fetchProductData,
  fetchCartsData,
  getCategories,
  findCartWithMAxValue,
  findLongestDistance,
  printPrice,
} from "./functions.js";

(async function () {
  const userData = await fetchUserData();
  const cartData = await fetchCartsData();
  const productData = await fetchProductData();

  console.log("_1_USER_DATA", userData);
  console.log("_1_CART_DATA", cartData);
  console.log("_1_PRODUCT_DATA", productData);

  const categories = getCategories(productData);
  const categoriesWithTotalPrices = categories.map((el) =>
    printPrice(el, productData)
  );
  console.log("_2_", categoriesWithTotalPrices);

  const cartWithHighestValue = findCartWithMAxValue(cartData, productData);
  const userI = cartWithHighestValue.userId;
  console.log(
    `_3_Cart with the highest value:,
    ${JSON.stringify(cartWithHighestValue)},
    belongs to
    ${userData[userI].name.firstname}
    ${userData[userI].name.lastname}`
  );

  const distanceResult = findLongestDistance(userData);
  console.log(
    `_4_Max distance: ${distanceResult.maxDistance} km between ${distanceResult.user1.firstname} ${distanceResult.user1.lastname} and ${distanceResult.user2.firstname} ${distanceResult.user2.lastname}.`
  );
})();
