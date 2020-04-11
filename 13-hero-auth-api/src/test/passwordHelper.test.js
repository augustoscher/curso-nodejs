const assert = require("assert");
const PasswordHelper = require('../helpers/passwordHelper');

const PASSWORD = 'Olokinho123';
const HASH = '$2b$04$5qrc.p/348vXg95B81GNu.UXEaJ5L7yM8KMbyszh8iyHbOQVD0I0.';

describe("UserHelper test Suite", function() {
  it('Should generate hash from password', async () => {
    const result = await PasswordHelper.hashPassword(PASSWORD);
    assert.ok(result.length > 10);
  });

  it('Should validate password by using hash', async () => {
    const result = await PasswordHelper.comparePassword(PASSWORD, HASH);
    assert.ok(result);
  });

});
