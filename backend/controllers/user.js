const bcrypt = require('bcrypt');
const User = require('../models/User');
const { isValidEmail, isValidPassword } = require('../utils/validators');

async function createUser(username, password, role) {
  try {
    if (!isValidEmail(username)) {
      return { success: false, error: 'Invalid email format.' };
    }

    if (!isValidPassword(password)) {
      return { success: false, error: 'Password must be min 8 chars, include uppercase, lowercase and a digit.' };
    }

    if (!['Admin', 'Client'].includes(role)) {
      return { success: false, error: 'Invalid user role.' };
    }


    const existing = await User.findOne({ username });
    if (existing) {
      return { success: false, error: 'User already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: username,
      password: hashedPassword,
      role
    });

    return {
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (err) {
    return { success: false, error: err.message || 'Create user failed.' };
  }
}


async function checkUser(username, password) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid credentials.' };
    }

    return {
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (err) {
    return { success: false, error: err.message || 'Authentication failed.' };
  }
}

module.exports = { createUser, checkUser };
