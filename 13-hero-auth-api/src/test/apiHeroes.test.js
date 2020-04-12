const assert = require("assert");
const api = require("../api");

let app = {};

describe("Heroes API", function () {
  const DEFAULT_HERO = {
    name: "Spider Man",
    power: "Web Shooter",
  };
  
  const DEFAULT_HERO_UPD = {
    name: "Universal Soldier",
    power: "Strength",
  };
  
  const user = {
    username: 'xunda',
    password: 'Olokinho123'
  };
  
  let MOCKED_ID;
  
  const token = "";

  const headers = {
    Authorization: token,
  };

  this.beforeAll(async () => {
    app = await api;

    const authResult = await app.inject({
      method: 'POST',
      url: '/login',
      payload: user
    });

    let p = JSON.parse(authResult.payload);
    headers.Authorization = p.token;

    const result = await app.inject({
      method: "POST",
      headers,
      url: "/heroes",
      payload: DEFAULT_HERO_UPD,
    });

    const data = JSON.parse(result.payload);
    MOCKED_ID = data._id;
  });

  it("GET /heroes", async () => {
    const result = await app.inject({
      method: "GET",
      headers,
      url: "/heroes",
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
  });

  it("GET /heroes with skip and limit", async () => {
    const LIMIT = 5;
    const result = await app.inject({
      method: "GET",
      headers,
      url: `/heroes?skip=0&limit=${LIMIT}`,
    });

    const data = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 200);
    assert.ok(Array.isArray(data));
    assert.deepEqual(data.length, LIMIT);
  });

  it("GET /heroes with skip, limit and name", async () => {
    const LIMIT = 50;
    const NAME = "Iron Man";
    const result = await app.inject({
      method: "GET",
      headers,
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
      headers,
      url: `/heroes`,
      payload: DEFAULT_HERO,
    });

    const { _id, message } = JSON.parse(result.payload);

    assert.deepEqual(result.statusCode, 200);
    assert.deepEqual(message, "Heroe sucessfully created");
    assert.notStrictEqual(_id, undefined);
  });

  it("PATCH /heroes/{id}", async () => {
    const expected = {
      name: "Pernalonga",
      power: "Smart",
    };

    const result = await app.inject({
      method: "PATCH",
      headers,
      url: `/heroes/${MOCKED_ID}`,
      payload: expected,
    });

    const payload = JSON.parse(result.payload);

    assert.deepEqual(result.statusCode, 200);
    assert.deepEqual(payload.message, "Hero successfully updated");
    assert.notStrictEqual(payload._id, undefined);
  });

  it("DELETE /heroes/{id}", async () => {
    const result = await app.inject({
      method: "DELETE",
      headers,
      url: `/heroes/${MOCKED_ID}`,
    });

    const payload = JSON.parse(result.payload);

    assert.deepEqual(result.statusCode, 200);
    assert.deepEqual(payload.message, "Hero successfully deleted");
  });

  it("DELETE /heroes/{id} - id inexistent", async () => {
    const result = await app.inject({
      method: "DELETE",
      headers,
      url: `/heroes/5e8284f5cccbd4d9581de703`,
    });

    const payload = JSON.parse(result.payload);

    assert.deepEqual(result.statusCode, 404); //Not Found
    assert.deepEqual(payload.message, "Hero not found");
  });
});
