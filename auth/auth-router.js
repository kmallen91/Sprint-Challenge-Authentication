const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../userModel");
const validate = require("../auth/authenticate-middleware");

router.post("/register", (req, res) => {
  const user = req.body;
  const newUser = { ...user, password: bcrypt.hashSync(user.password) };

  users
    .add(newUser)
    .then(saved => {
      if (saved) {
        res.status(201).json(saved);
      }
    })
    .catch(err => res.status(500).json({ error: `error adding user` }));
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: `invalid credentials` });
      }
    })
    .catch(err => {
      console.log("error from login", err);
      res.status(500).json({ error: `error logging in` });
    });
});

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

module.exports = router;
