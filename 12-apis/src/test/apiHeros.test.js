const assert = require("assert");
const api = require("../api");

describe("Heroes API", function() {
  this.beforeAll(async () => {
    app = await api;
  });

  it("GET /heroes", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/heroes"
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
  });

  it("GET /heroes with skip and limit", async () => {
    const LIMIT = 5
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT}`,
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
    assert.deepEqual(data.length, LIMIT);
  });

  it("GET /heroes with skip, limit and name", async () => {
    const LIMIT = 50
    const NAME = "Iron Man"
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT}&name=${NAME}`,
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
    assert.deepEqual(data[0].name, NAME);
  });
});
