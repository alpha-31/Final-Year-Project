const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

class PasswordHandler extends Error {
    static async toHash(password) {
        const salt = randomBytes(8).toString('hex');
        const buffer = await scryptAsync(password, salt, 64);
    
        return `${buffer.toString('hex')}.${salt}`;
      }
    
      static async compare(stored, supplied) {
        const [hashedPassword, salt] = stored.split('.');
        const buffer = await scryptAsync(supplied, salt, 64);
        return buffer.toString('hex') === hashedPassword;
      }
}

module.exports = PasswordHandler;