const jwt = require("jsonwebtoken");

module.exports = {
  getJwtToken
};

function getJwtToken(username) {
  const payload = {
    username
  };

  const secret = process.env.JWT_SECRET || "keep it a secret";
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
