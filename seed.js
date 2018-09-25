const {db, Vegetable, Gardener, Plot} = require('./models');
const Garden = db.model('garden');


db.sync({force: true})
  .then(() => {
    console.log('Database synced!');
    return Promise.all([
        Vegetable.create({name: 'carrot', color: 'orange', planted_on: null}, {returning: true}),
        Vegetable.create({name: 'broccoli', color: 'green', planted_on: null}),
        Vegetable.create({name: 'spinach', color: 'green', planted_on: null}),
        Vegetable.create({name: 'pepper', color: 'red', planted_on: null}),
        Vegetable.create({name: 'tomatoes', color: 'red', planted_on: null}),
        Vegetable.create({name: 'potatoes', color: 'brown', planted_on: null}),
        Gardener.create({name: 'Sarah', age: 35}, {returning: true}),
        Gardener.create({name: 'Joe', age: 23}),
        Gardener.create({name: 'Hank', age: 54}),
        Gardener.create({name: 'Betty', age: 42}),
        Plot.create({size: 5, shaded: true}),
        Plot.create({size: 3, shaded: false}),
        Plot.create({size: 2, shaded: true}),
        Plot.create({size: 1, shaded: false})
    ])
  })
 .then((tables) => {
      var [carrot, broccoli, spinach, pepper] = tables.slice(0, 6);
      var [sarah, joe, hank, betty] = tables.slice(6, 10);
      var [sPlot, jPlot, hPlot, bPlot] = tables.slice(10);

      return Promise.all([
         sarah.setFavoriteVegetable(carrot),
         joe.setFavoriteVegetable(broccoli),
         hank.setFavoriteVegetable(spinach),
         betty.setFavoriteVegetable(pepper),
         sPlot.setGardener(sarah),
         jPlot.setGardener(joe),
         hPlot.setGardener(hank),
         bPlot.setGardener(betty),
         Garden.create({vegetableId: carrot.id, plotId: sPlot.id}),
         Garden.create({vegetableId: broccoli.id, plotId: jPlot.id}),
         Garden.create({vegetableId: spinach.id, plotId: hPlot.id}),
         Garden.create({vegetableId: pepper.id, plotId: bPlot.id}),
      ])
  })
  .then(() => {
    console.log("Did it!")
  })
  .catch(err => {
    console.log('Disaster! Something went wrong! ')
    console.log(err)
  }).finally(() => {
  db.close()
})

