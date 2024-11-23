const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.getPublicProfile());
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'status', 'settings'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    const user = await User.findById(req.user._id);
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    res.json(user.getPublicProfile());
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search users
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const users = await User.find({
      $or: [
        { username: new RegExp(searchTerm, 'i') },
        { email: new RegExp(searchTerm, 'i') }
      ]
    }).limit(20);

    res.json(users.map(user => user.getPublicProfile()));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add contact
router.post('/contacts/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const contactId = req.params.userId;

    if (user.contacts.includes(contactId)) {
      return res.status(400).json({ message: 'Contact already added' });
    }

    user.contacts.push(contactId);
    await user.save();

    res.json(user.getPublicProfile());
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
