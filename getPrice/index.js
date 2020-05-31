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
    products: [...listOfProducts]
  };
  arrayOfStore[1] = {
    name: 'АТБ',
    price: 0,
    count: 0,
    products: [...listOfProducts]
  };
  arrayOfStore[2] = {
    name: 'Велика Кишеня',
    price: 0,
    count: 0,
    products: [...listOfProducts]
  };
  arrayOfStore[3] = {
    name: 'Сільпо',
    price: 0,
    count: 0,
    products: [...listOfProducts]
  };
  for (let i = 0; i < listOfProducts.length; i++) {
    // идём по продуктам
    console.log(listOfProducts[i]);
    arrayPrice = await getPrice([listOfProducts[i]]); // получаем цены в магазинах на продукт
    if (arrayPrice[0] !== undefined) {
      const firstItem = arrayPrice[0].pricesAndStores; // на первый в списке
      firstItem.forEach(key => {
        // на каждый магаз/цену
        for (let store = 0; store < arrayOfStore.length; store++) {
          // пробегаем по хард магазинам

          if (arrayOfStore[store].name === key.store) {
            // если названия совпали
            arrayOfStore[store].price = Number(arrayOfStore[store].price.toFixed(2));
            arrayOfStore[store].price += key.price; // суммируем цену
            arrayOfStore[store].count += 1;
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
  sortByPrice(arrayOfStore);
  console.log(arrayOfStore);
  return arrayOfStore;
}
module.exports = getCart;
