const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
  username: 'authguy',
  password: 'mypassword',
  profile: {
    firstName: 'Chris',
    lastName: 'Wolstenholme',
    age: 43
  }
};


const secretKey = 'barry-92dc-4ced-a758-barry'

router.post('/login', (req, res) => {
  if (req.body.username === mockUser.username && req.body.password === mockUser.password) {

    const token = jwt.sign(req.body, secretKey)
    res.json({ token })

  } else {
    res.status(401)
    res.json({ error: 'invalid credentials' })
  }
});


//token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhndXkiLCJpYXQiOjE2NDk2OTQxNDB9.hIcQd6FEcdU1ySOFSsGv2HxXKaWPkVy2Rflh1rZkDgE

router.get('/profile', (req, res) => {
  const result = verifyToken(req.headers.authorization, secretKey)
  console.log(req.headers)

  if (result) {
    res.json({ user: mockUser.profile })
    console.log("yo", result)
  } else {
    res.status(401)
    res.json({ error: 'Invalid token' })
  }
});

function verifyToken(token, secretKey) {
  try {
    const result = jwt.verify(token, secretKey)
    return result
  }
  catch (error) {
    return false
  }
}

module.exports = router;
