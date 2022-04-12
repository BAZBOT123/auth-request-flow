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
    res.status(400)
    res.json({ error: 'invalid credentials' })
  }
});


//token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhndXkiLCJpYXQiOjE2NDk2OTQxNDB9.hIcQd6FEcdU1ySOFSsGv2HxXKaWPkVy2Rflh1rZkDgE

router.get('/profile', (req, res) => {
  const result = verifyToken(req.headers.token, secretKey)
  console.log(req.headers)

  res.json({ result })
  console.log("yo", result)
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
