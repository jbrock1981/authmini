const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.post('/api/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password);
  db('users')
    .insert(user)
    .then(id => {
      res
        .status(201)
        .json({id: ids[0]});
    })
    .catch(err => {
      res
        .status(500)
        .send(err);
    })
});

server.post('/api/login', (req, res) => {
  const user = req.body;

  db('users')
    .where('username', user.username)
    .then(users => {
      if (users.length && bcrypt.compareSync(bodyUser.password, users[0].password)) {
        res
          .json({ info: "correct" })
      } else {
        res
          .status(404)
          .json({err: "invalis username or password"});
      }
    })
    .catch(err => {
      res
        .status(500)
        .send(err);
    })
})

// protect this route, only authenticated users should see it
server.get('/api/users', (req, res) => {
  db('users')
    .select('id', 'username')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
