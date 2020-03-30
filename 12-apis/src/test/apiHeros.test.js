const assert = require("assert");
const api = require("../api");

describe("Heroes API", function() {

  const DEFAULT_HERO = {
    name: 'Spider Man',
    power: 'Web Shooter'
  };

  const DEFAULT_HERO_UPD = {
    name: 'Universal Soldier',
    power: 'Strength'
  };

  let MOCKED_ID;

  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: 'POST',
      url: '/heroes',
      payload: DEFAULT_HERO_UPD,
    });
    const data = JSON.parse(result.payload)
    MOCKED_ID = data._id;
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

  it("POST /heroes", async () => {
    const result = await app.inject({
      method: "POST",
      url: `/heroes`,
      payload: DEFAULT_HERO,
    });

    const { _id, message } = JSON.parse(result.payload);

    assert.deepEqual(result.statusCode, 200);
    assert.deepEqual(message, 'Heroe sucessfully created')
    assert.notStrictEqual(_id, undefined);
  });

  it("PATCH /heroes", async () => {
    const expected = {
      name: 'Pernalonga',
      power: 'Smart',
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/heroes/${MOCKED_ID}`,
      payload: expected,
    });

    const payload = JSON.parse(result.payload);

    assert.deepEqual(result.statusCode, 200);
    assert.deepEqual(payload.message, 'Heroe sucessfully updated')
    assert.notStrictEqual(payload._id, undefined);
  });
});
