const express = require('express');
const app = express();
const morgan = require("morgan");
const gardeners = require('./views/gardeners');
const { db, Vegetable, Gardener, Plot } = require('./models');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/gardeners', (req, res) => {
  res.redirect('/');
})

app.get('/', (req, res, next) => {
  return Gardener.findAll()
  .then((planters) => {
    res.send(gardeners(planters));
  })
});

app.get('/gardeners/:id')

const PORT = 3000;

app.listen(PORT, () => {
  console.log("listening")
})
