const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register (optional)
router.post('/register', async (req, res) => {
  const { email, password, name, age, race } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    age,
    race
  });

  await newUser.save();
  res.json({ msg: 'User registered successfully' });
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password'); // exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user); // send full user data
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// GET /api/auth/users — no auth
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name age race');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
