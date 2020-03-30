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
    const result = await app.inject({
      method: "GET",
      url: "/heroes?skip=0&limit=5",
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
    assert.ok(data.length === 5);
  });
});
