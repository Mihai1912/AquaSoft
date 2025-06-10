const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Region = sequelize.define('Region', {
    propertystateprovinceid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    propertystateprovincename: DataTypes.STRING
}, {
    tableName: 'regions',
    timestamps: false,
})

module.exports = Region;