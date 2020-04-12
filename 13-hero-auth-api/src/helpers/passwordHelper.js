const Bcrypt = require('bcrypt');
const { promisify } = require('util');

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);

const SALT = parseInt(process.env.SALT_PWD);

class PasswordHelper {
    static hashPassword(pswd) {
      return hashAsync(pswd, SALT);
    }

    static comparePassword(pswd, hash) {
      return compareAsync(pswd, hash);
    }
}

module.exports = PasswordHelper;
