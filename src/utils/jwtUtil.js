const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
// console.log(pathToKey);

const generateJWT = (user) => {
  const userId = user.id;
  const expiresIn = "2d";

  const payload = {
    sub: userId,
    iat: Date.now(),
  };

  //   console.log(payload);

  let token = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + token,
    expiresIn: expiresIn,
  };
};

module.exports.generateJWT = generateJWT;
