const assert = require('assert');
const createUrl = require('../urlcreate/index');
it('Test of correctly link', function() {
  const URL = 'https://www.povarenok.ru/recipes/search/';
  const ings = ['вода'];
  const result = createUrl(URL, ings, 0);
  const expectedResult = 'https://www.povarenok.ru/recipes/search/?ing=%E2%EE%E4%E0';
  assert.equal(result, expectedResult);
});
