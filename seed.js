const {db, Vegetable, Gardener, Plot} = require('./models');

const veggies = [
    Vegetable.create({name: 'carrot', color: 'orange', planted_on: null}),
    Vegetable.build({name: 'broccoli', color: 'green', planted_on: null}), 
    Vegetable.build({name: 'spinach', color: 'green', planted_on: null}),
    Vegetable.build({name: 'pepper', color: 'red', planted_on: null}),
    Vegetable.build({name: 'tomatoes', color: 'red', planted_on: null}),
    Vegetable.build({name: 'potatoes', color: 'brown', planted_on: null})
];

Promise.all(veggies)
.then(([veggie, wasCreated]) => {
    return veggie.save();
}).then((veggie) => {
    console.log(veggie.name);
}).catch((error) => {
    console.log(error);
});

db.sync({force: true})
  .then(() => {
    console.log('Database synced!')
    // db.close() // only if using a version of node without `finally`
  })
  .catch(err => {
    console.log('Disaster! Something went wrong! ')
    console.log(err)
    // db.close() // only if using a version of node without `finally`
  })
  .finally(() => { // only if using a version of node WITH `finally`
    db.close()
  })
