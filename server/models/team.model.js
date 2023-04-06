const Sequelize = require('sequelize');
const sequelize = require('../database/conn');
const jwt = require("jsonwebtoken");


const User = sequelize.define('team', {
    teamprofile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    publicurlid: {
        type: Sequelize.STRING,
        allowNull: true
    },
    teamname: {
        type: Sequelize.STRING,
        allowNull: true
    },


    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


module.exports = User