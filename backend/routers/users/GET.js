const { User } = require("../../models/user");

async function getUsers(_req, res) {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
}

async function getUserById(req, res) {
  const userList = await User.findById(req.params.id).select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
}

async function getUserCount(_req, res) {
  const userCount = await User.countDocuments();

  if (!userCount) {
    res.status(500).json({ success: false });
  }

  res.send({ userCount });
}

module.exports = { getUsers, getUserById, getUserCount };
