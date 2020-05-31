const assert = require('assert');
const getPrice = require('../getPrice/index');
const createUrl = require('../urlcreate/index');

describe('Test result of getPrice', function() {
  it('should be not empty', async function() {
    const product = ['вода'];
    const result = await getPrice([product]);
    const expected = 4;
    assert.equal(result.length, expected);
  });
});
it('Test of correctly link', function() {
  const URL = 'http://mysupermarket.org.ua/index.php?search=';
  const ings = ['вода'];
  const result = createUrl(URL, ings, 0);
  const expectedResult = 'http://mysupermarket.org.ua/index.php?search=?ing=%E2%EE%E4%E0';
  assert.equal(result, expectedResult);
});
