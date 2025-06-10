const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const City = sequelize.define('City', {
    cityid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cityname: DataTypes.STRING,
    country: DataTypes.STRING
}, {
    tableName: 'cities',
    timestamps: false,
})

module.exports = City;