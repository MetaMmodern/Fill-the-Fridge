const request = require("supertest");
const assert = require("assert");
const app  = require('../index').app;
// if you want to test index.js, you need to comment line #59 in index.js file!!!
describe ('Testing rout ', function () {
  it("Test '/", function(done){

    request(app)
      .get("/")
      .expect(200)
      .set('Accept-Encoding', 'gzip')
      .end(done);
  });
  it("Test '/recipes/search/'", function(done){

    request(app)
      .get("/recipes/search/")
      .expect(200)
      .set('Accept-Encoding', 'gzip')
      .end(done);
  });
  it("Test '/Cart'", function(done){

  request(app)
    .get("/Cart")
    .expect(200)
    .set('Accept-Encoding', 'gzip')
    .end(done);
});
})
