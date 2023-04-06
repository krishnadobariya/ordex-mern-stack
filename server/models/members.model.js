const Sequelize = require('sequelize');
const sequelize = require('../database/conn');


const Dist = sequelize.define('members', {

    teamid: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    memberprofile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    performance: {
        type: Sequelize.STRING,
        allowNull: true
    },
    countryflag: {
        type: Sequelize.STRING,
        allowNull: true
    },
    countryname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    countrycode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    strengths: {
        type: Sequelize.STRING,
        allowNull: true
    },
    available: {
        type: Sequelize.STRING,
        allowNull: true
    },


}, {
    timestamps: false,
});


module.exports = Dist