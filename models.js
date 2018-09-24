const Sequelize = require('sequelize');
//we need to create a sequelize instance, rep. our connection to the db
const db = new Sequelize('postgres://localhost:5432/plantr', {
    logging: false
});

//These are the models for our database (creating a table for our models)
const Gardener = db.define('gardener', {

    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
});

const Plot = db.define('plot', {

    size: {
        type: Sequelize.INTEGER
    },
    shaded: {
        type: Sequelize.BOOLEAN
    }
});

const Vegetable = db.define('vegetable', {

    name: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    planted_on: {
        type: Sequelize.DATE
    }
});

//Create Association types> One-to-One relations
Plot.belongsTo(Gardener)
Gardener.hasOne(Plot);

//Many-to-Many Relationship
Vegetable.belongsToMany(Plot, {through: 'garden'});
Plot.belongsToMany(Vegetable, {through: 'garden'});

//Many-to-One Relation
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});
// Vegetable.hasMany(Gardener, {as: 'favorite_vegetable'});

module.exports = {db, Vegetable, Gardener, Plot};
