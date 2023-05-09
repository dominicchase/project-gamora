const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

async function createUser(req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    country: req.body.country,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });

  user = await user.save();

  if (!user) {
    return res.status(500).send("User can not be created...");
  }

  return res.send(user);
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const secret = process.env.SECRET;

  if (!user) {
    return res.status(400).send("User not found...");
  }

  if (bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    return res.status(200).send({ email, token });
  } else return res.status(400).send("Incorrect password...");
}

module.exports = { createUser, login };
