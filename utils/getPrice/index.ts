import needle from "needle";
import cheerio from "cheerio";
import creatorurl from "../urlcreate";

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getNumber(str: any) {
  return parseFloat(str);
}
function sortByPrice(arrayOfStore: any) {
  arrayOfStore.sort((store, anotherStore) => {
    // eslint-disable-next-line no-param-reassign
    store.price = Number(store.price.toFixed(2));
    // eslint-disable-next-line no-param-reassign
    anotherStore.price = Number(anotherStore.price.toFixed(2));
    if (store.count === anotherStore.count) {
      if (store.price > anotherStore.price) return 1;
      return -1;
    }

    if (store.count < anotherStore.count) return 1;
    return -1;
  });
}
async function getPrice(ings) {
  try {
    if (ings === undefined) {
      throw new Error("No ingredients passed");
    }
    if (ings.length === 0) {
      throw new Error("empty array");
    }
    const URL = "http://mysupermarket.org.ua/index.php?search=";
    const readyURL = creatorurl(URL, ings, 0);
    const options = {
      headers: { Referer: "http://mysupermarket.org.ua/" },
    };
    const items = [];
    await wait(100);
    const response = await needle("get", readyURL, options);
    if (response.statusCode !== 200) {
      throw new Error("Error, not 200");
    }
    const $ = cheerio.load(response.body);

    $("table:nth-child(4) td").each((index, value) => {
      const item = {
        name: "",
        pricesAndStores: [],
      };
      $(value)
        .find("p")
        .each((_index, elem) => {
          if ($(elem).find("b").text() !== "") {
            if ($(elem).find("b").text().includes("grn.")) {
              item.pricesAndStores.push({
                store: $(elem).find("a").text(),
                price: getNumber($(elem).find("b").text()),
              });
            } else {
              item.name = $(value).find("b").first().text();
              item.amount = $(value).find("i").text();
            }
          }
        });

      items.push(item);
    });
    return items;
  } catch (error) {
    return new Error(error);
  }
}
function crossItOut(products, nameOfProduct) {
  for (let product = 0; product < products.length; product++) {
    if (nameOfProduct === products[product]) {
      products.splice(product, 1);
    }
  }
  return products;
}
function getShoppingList(shoppingList, products) {
  return shoppingList.filter((n) => products.indexOf(n) === -1);
}
function getCount(shoppingList) {
  return shoppingList.length;
}
function getMinPrice(arrayOfStore) {
  for (let store = 0; store < arrayOfStore.length; store++) {
    const { listOfAllGoods } = arrayOfStore[store];
    let { shoppingList } = arrayOfStore[store];
    const { products } = arrayOfStore[store];
    const arrayOfName = [];
    shoppingList.forEach((product) => {
      let minPrice = 0;

      const nameOfMinProduct = {
        name: "",
        price: 0,
      };
      for (let goods = 0; goods < listOfAllGoods.length; goods++) {
        if (listOfAllGoods[goods].name === product)
          if (minPrice === 0 || minPrice > listOfAllGoods[goods].price) {
            minPrice = listOfAllGoods[goods].price;
            nameOfMinProduct.name = listOfAllGoods[goods].name;
            nameOfMinProduct.price = listOfAllGoods[goods].price;
          }
      }
      if (nameOfMinProduct.name) arrayOfName.push(nameOfMinProduct);
      // eslint-disable-next-line no-param-reassign
      arrayOfStore[store].price += minPrice;
    });
    shoppingList = getShoppingList(shoppingList, products);
    // eslint-disable-next-line no-param-reassign
    arrayOfStore[store].shoppingList = shoppingList;
    // eslint-disable-next-line no-param-reassign
    arrayOfStore[store].count = getCount(arrayOfStore[store].shoppingList);
    // eslint-disable-next-line no-param-reassign
    arrayOfStore[store].listOfAllGoods = arrayOfName;
  }
}

async function getCart(responseProds) {
  let listOfProducts: any[] = [];
  Object.values(responseProds).forEach((val) => {
    listOfProducts = val;
  });
  // for (const product in responseProds) {
  //   if (Object.prototype.hasOwnProperty.call(responseProds, product)) {
  //     listOfProducts = responseProds[product];
  //   }
  // }
  let arrayPrice = 0;
  const arrayOfStore = [];
  arrayOfStore[0] = {
    name: "Novus",
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts],
  };
  arrayOfStore[1] = {
    name: "АТБ",
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts],
  };
  arrayOfStore[2] = {
    name: "Велика Кишеня",
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts],
  };
  arrayOfStore[3] = {
    name: "Сільпо",
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts],
  };

  for (let i = 0; i < listOfProducts.length; i++) {
    // идём по продуктам
    // eslint-disable-next-line no-await-in-loop
    arrayPrice = await getPrice([listOfProducts[i]]); // получаем цены в магазинах на продукт
    for (let newStore = 0; newStore <= arrayPrice.length; newStore++)
      if (arrayPrice[newStore] !== undefined) {
        const firstItem = arrayPrice[newStore].pricesAndStores; // на первый в списке

        for (let index = 0; index < firstItem.length; index++) {
          const element = firstItem[index];
          // на каждый магаз/цену
          for (let store = 0; store < arrayOfStore.length; store++) {
            // пробегаем по хард магазинам

            if (arrayOfStore[store].name === element.store) {
              // если названия совпали
              const goods = {
                price: "",
                name: "",
              };
              goods.price = element.price;
              goods.name = listOfProducts[i];
              arrayOfStore[store].listOfAllGoods.push(goods);
              crossItOut(arrayOfStore[store].products, listOfProducts[i]);
            }
          }
        }
      }
  }
  getMinPrice(arrayOfStore);
  sortByPrice(arrayOfStore);
  return arrayOfStore;
}
export default getCart;
