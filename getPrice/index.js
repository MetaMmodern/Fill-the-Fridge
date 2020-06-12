const needle = require('needle');
const cheerio = require('cheerio');
const creatorurl = require('../urlcreate');

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function getNumber(str) {
  return parseFloat(str);
}
function sortByPrice(arrayOfStore) {
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
      throw new Error('No ingredients passed');
    }
    if (ings.length === 0) {
      throw new Error('empty array');
    }
    const URL = 'http://mysupermarket.org.ua/index.php?search=';
    const readyURL = creatorurl(URL, ings, 0);
    const options = {
      headers: { Referer: 'http://mysupermarket.org.ua/' }
    };
    const items = [];
    await wait(100);
    const response = await needle('get', readyURL, options);
    if (response.statusCode !== 200) {
      throw new Error('Error, not 200');
    }
    const $ = cheerio.load(response.body);

    $('table:nth-child(4) td').each((index, value) => {
      const item = {
        name: '',
        pricesAndStores: []
      };
      $(value)
        .find('p')
        .each((_index, elem) => {
          if (
            $(elem)
              .find('b')
              .text() !== ''
          ) {
            if (
              $(elem)
                .find('b')
                .text()
                .includes('grn.')
            ) {
              item.pricesAndStores.push({
                store: $(elem)
                  .find('a')
                  .text(),
                price: getNumber(
                  $(elem)
                    .find('b')
                    .text()
                )
              });
            } else {
              item.name = $(value)
                .find('b')
                .first()
                .text();
              item.amount = $(value)
                .find('i')
                .text();
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
function getMinPrice(arrayOfStore) {
  for (let store = 0; store < arrayOfStore.length; store++) {
    const listOfAllGoods = arrayOfStore[store].listOfAllGoods;
    const shoppingList = arrayOfStore[store].shoppingList;
    shoppingList.forEach(product => {
      let minPrice = 0;
      for (let goods = 0; goods < listOfAllGoods.length; goods++) {
        if (listOfAllGoods[goods].name === product) {
          if (minPrice === 0 || minPrice > listOfAllGoods[goods].price) minPrice = listOfAllGoods[goods].price;

        }
      }
      arrayOfStore[store].price+=minPrice;
     // console.log(`${arrayOfStore[store].name} ${product} ${minPrice}`);
    });
  }
}
function getCount (arrayOfStore)
{
  for (let store = 0; store < arrayOfStore.length;store++)
  {
     const products = arrayOfStore[store].products;
     const shoppingList = arrayOfStore[store].shoppingList;
     const newShoppingList = shoppingList.filter(n => products.indexOf(n) === -1);
     arrayOfStore[store].shoppingList = newShoppingList;
     arrayOfStore[store].count = newShoppingList.length;
  }
}
async function getCart(responseProds) {
  let listOfProducts;
  for (const product in responseProds) {
    if (Object.prototype.hasOwnProperty.call(responseProds, product)) {
      listOfProducts = responseProds[product];
    }
  }
  let arrayPrice = 0;
  const arrayOfStore = [];
  arrayOfStore[0] = {
    name: 'Novus',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts]
  };
  arrayOfStore[1] = {
    name: 'АТБ',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts]
  };
  arrayOfStore[2] = {
    name: 'Велика Кишеня',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts]
  };
  arrayOfStore[3] = {
    name: 'Сільпо',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    listOfAllGoods: [],
    shoppingList: [...listOfProducts]
  };

  for (let i = 0; i < listOfProducts.length; i++) {
    // идём по продуктам
    arrayPrice = await getPrice([listOfProducts[i]]); // получаем цены в магазинах на продукт
    for (let newStore = 0; newStore <= arrayPrice.length; newStore++)
      if (arrayPrice[newStore] !== undefined) {
        const firstItem = arrayPrice[newStore].pricesAndStores; // на первый в списке
        // console.log(firstItem);
        const minPrice = 0;
        firstItem.forEach(key => {
          // на каждый магаз/цену
          for (let store = 0; store < arrayOfStore.length; store++) {
            // пробегаем по хард магазинам

            if (arrayOfStore[store].name === key.store) {
              // если названия совпали
              const temp = {
                store: '',
                price: '',
                name: ''
              };
              temp.store = key.store;
              temp.price = key.price;
              temp.name = listOfProducts[i];
              arrayOfStore[store].listOfAllGoods.push(temp);
             // arrayOfStore[store].price += key.price; // суммируем цену
             // arrayOfStore[store].count += 1;
              for (let product = 0; product < arrayOfStore[store].products.length; product++) {
                if (listOfProducts[i] === arrayOfStore[store].products[product]) {
                  arrayOfStore[store].products.splice(product, 1);
                }
              }
            }
          }
        });
      }
  }
  getMinPrice(arrayOfStore);
  getCount(arrayOfStore);
  sortByPrice(arrayOfStore);
  console.log(arrayOfStore);
  return arrayOfStore;
}
module.exports = getCart;
