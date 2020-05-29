const needle = require('needle');
const cheerio = require('cheerio');
const creatorurl = require('../urlcreate');

function getNumber(str) {
  return parseFloat(str);
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
    products: [...listOfProducts],
    MinimalCost: false
  };
  arrayOfStore[1] = {
    name: 'АТБ',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    MinimalCost: false
  };
  arrayOfStore[2] = {
    name: 'Велика Кишеня',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    MinimalCost: false
  };
  arrayOfStore[3] = {
    name: 'Сільпо',
    price: 0,
    count: 0,
    products: [...listOfProducts],
    MinimalCost: false
  };
  for (let i = 0; i < listOfProducts.length; i++) {
    // идём по продуктам
    arrayPrice = await getPrice([listOfProducts[i]]); //получаем цены в магазинах на продукт
    const firstItem = arrayPrice[0].pricesAndStores; //на первый в списке
    firstItem.forEach(key => {
      //на каждый магаз/цену
      for (let store = 0; store < arrayOfStore.length; store++) {
        //пробегаем по хард магазинам

        if (arrayOfStore[store].name === key.store) {
          //если названия совпали
          arrayOfStore[store].price += key.price; //суммируем цену
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

  let minStore = arrayOfStore[0];
  const countFirst = arrayOfStore[0].count;
  for (let i = 1; i < arrayOfStore.length; i++) {
    if (countFirst === arrayOfStore[i].count) {
      if (minStore.price > arrayOfStore[i].price) {
        minStore = arrayOfStore[i];
      }
    } else if (countFirst < arrayOfStore[i].count) {
      minStore = arrayOfStore[i];
    }
  }
  for (let i = 0; i < arrayOfStore.length; i++)
    if (arrayOfStore[i].name === minStore.name) {
      arrayOfStore[i].MinimalCost = true;
      arrayOfStore[i].price = Number(arrayOfStore[i].price.toFixed(2));
    }
  return arrayOfStore;
}
module.exports = getCart;
