const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

async function verify_password(password, hashed_password) {
    const passwordMatch = await compare(password, hashed_password);
    return passwordMatch;
}

async function hash_password(password, saltRounds) {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}



module.exports = { verify_password, hash_password };