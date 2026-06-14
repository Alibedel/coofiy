const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = { signup, login };

async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.status(201).json({ token, user });
  } catch (err) {
    // Most likely a duplicate email or missing required field
    res.status(400).json({ err: 'Email already taken or invalid data' });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: 'User not found' });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (err) return res.status(500).json({ err: 'Server error' });
      if (!isMatch) return res.status(401).json({ err: 'Bad password' });
      const token = createJWT(user);
      res.json({ token });
    });
  } catch (err) {
    res.status(400).json({ err: 'Login failed' });
  }
}

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}
