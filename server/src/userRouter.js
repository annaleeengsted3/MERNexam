const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Used for hashing passwords!

// Create the routes and export the router
module.exports = (secret, usersDB) => {

    // FOR TESTING PURPOSES ONLY
    router.get('/', async (req, res) => {
      const users = await usersDB.getUsers(); 
      res.json(users);
    });
    //TESTING





  router.patch('/', (req, res) => {
    // TODO: Implement user update (change password, etc).
    res.status(501).json({ msg: "update user not implemented" });
  });

  // This route takes a username and a password and creates an auth token
  // POST /api/users/authenticate
  router.post('/authenticate', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const users = await usersDB.getUsers(); 

    if (!username || !password) {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return;
    }
    const user = users.find((user) => user.username === username);
    if (user) { // If the user is found
      if (bcrypt.compareSync(password, user.hash)) {
        const payload = { username: username };
        const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });

        res.json({
          msg: `User '${username}' authenticated successfully`,
          token: token
        });
      } else {
        res.status(401).json({ msg: "Password mismatch!" })
      }
    } else {
      res.status(404).json({ msg: "User not found!" });
    }
  });

  router.post('/', async(req, res) => {
    // 
    const username = req.body.username;
    const password = req.body.password;
    const users = await usersDB.getUsers(); 
 
    if (!username || !password) {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return;
    }
    const user = users.find((user) => user.username === username);
    if (user) { // If the username already exists
      console.log("Username already exists");
    res.json({
          msg: `User '${username}' already exists`
        });
    
    } else {
console.log("New user being created");
      const user = await usersDB.createUser(username,password);
      res.json(user);
    }

  });

  return router;
};