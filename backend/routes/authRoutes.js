const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { createUser, checkUser } = require('../controllers/user');
const { ensureAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');



router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;
  const result = await createUser(username, password, role);
  if (!result.success) return res.status(400).json(result);
  res.json({ success: true, user: result.user });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await checkUser(username, password);
  if (!result.success) return res.status(401).json(result);
  req.session.user = result.user;
  res.json({ success: true, user: result.user });
});


router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success: false, error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ user: null });
  }
  res.json({ user: req.session.user });
});

router.get('/users', ensureAuth, requireRole('Admin'), async (req, res) => {
  const users = await User.find({}, 'username email createdAt');
  res.json({ success: true, users });
});


module.exports = router;
