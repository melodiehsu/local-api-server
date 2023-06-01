const express = require('express');
const router = express.Router();

const User = require('../models/user');

const getUser = async(req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getUser, async (req, res) => {
  res.send(res.user);
});

router.post('/', async (req, res) => {
  const user = new User({
    username:req.body.username,
    password:req.body.password,
    name:req.body.name,
    email:req.body.email,
  });

  try {
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(400).json({ message : err.message })
  }
});

router.patch('/:id', getUser, async (req, res) => {
  const {username, password, name, email} = req.body;
  if (username) res.user.username = username;
  if (password) res.user.password = password;
  if (name) res.user.name = name;
  if (email) res.user.email = email;

  try {
    const updateUser = await res.user.save();
    res.json(updateUser);
  } catch (err) {
    res.status(400).json({ message:'Update User failed' }) //更新失敗
  }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: 'Delete user succeed' });
  } catch (err) {
    res.status(500).json({ message: 'remove user failed' });
  }
});

//Export 該Router
module.exports = router;