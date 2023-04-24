//1
export async function fetchUserData() {
  const url = "https://fakestoreapi.com/users";
  try {
    const res = await fetch(url);
    const userData = await res.json();
    return userData;
  } catch (err) {
    console.log(err);
  }
}

export const fetchProductData = async () => {
  const url = "https://fakestoreapi.com/products";
  try {
    const res = await fetch(url);
    const productData = await res.json();
    return productData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCartsData = async () => {
  const url =
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07";
  try {
    const res = await fetch(url);
    const cartData = await res.json();
    return cartData;
  } catch (err) {
    console.log(err);
  }
};

// 2
export const getCategories = (product) => {
  const categories = product.map((el) => el.category);
  const distinctCategories = Array.from(new Set(categories));
  return distinctCategories;
};

export const printPrice = (category, productData) => {
  const price = productData
    .filter((el) => category === el.category)
    .map((el) => el.price)
    .reduce((acc, cur) => acc + cur, 0);
  return {
    Category: category,
    Price: price.toFixed(2),
  };
};

// 3

export const findCartWithMAxValue = (cartData, productData) => {
  const cart = cartData
    .map((el) => countCartForProduct(el, productData))
    .sort((a, b) => b.price - a.price);
  const cartWithHighestValue = cart[0];
  return cartWithHighestValue;
};

const countCartForProduct = (el, productData) => {
  return {
    id: el.id,
    userId: el.userId,
    price: countPricePerProduct(el.products, productData),
  };
};

const countPricePerProduct = (arr, productData) => {
  return arr
    .map((el) => countProductPrice(el.productId, el.quantity, productData))
    .reduce((acc, cur) => acc + cur, 0);
};

export const countProductPrice = (productId, quantity, productData) => {
  const product = productData.filter((el) => el.id === productId)[0];
  if (product) return product.price * quantity;
  else throw new Error("Product not found");
};

// 4
export const findLongestDistance = (data) => {
  let user1, user2;
  let maxDistance = 0;
  for (let i = 0; i < data.length; i++) {
    let firstUser = data[i];
    for (let j = 0; j < data.length; j++) {
      let secondUser = data[j];
      const firstUserLat = +firstUser.address.geolocation.lat;
      const firstUserLong = +firstUser.address.geolocation.long;
      const secondUserLat = +secondUser.address.geolocation.lat;
      const secondUserLon = +secondUser.address.geolocation.long;

      let distance = calculateDistance(
        firstUserLat,
        firstUserLong,
        secondUserLat,
        secondUserLon
      );
      let curDistance = Math.round(distance * 1.609344, 2);
      if (curDistance > maxDistance) {
        maxDistance = curDistance;
        user1 = firstUser.name;
        user2 = secondUser.name;
      }
    }
  }
  return {
    maxDistance: maxDistance,
    user1: user1,
    user2: user2,
  };
};

const calculateDistance = (lat, lon, lat2, lon2) => {
  let distance =
    60 *
    1.1515 *
    (180 / Math.PI) *
    Math.acos(
      Math.sin(lat * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) +
        Math.cos(lat * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.cos((lon - lon2) * (Math.PI / 180))
    );
  return distance;
};
