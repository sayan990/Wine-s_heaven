const jwt = require("jsonwebtoken");

function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    console.log(payload)
    jwt.sign(payload, "palabrasecreta", 
    { expiresIn: "1d" }, 
    (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

module.exports = createAccesToken;
