const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Hotel = sequelize.define('Hotel', {
    globalpropertyid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    sourcepropertyid: DataTypes.STRING,
    globalpropertyname: DataTypes.STRING,
    globalchaincode: DataTypes.STRING,
    propertyaddress1: DataTypes.STRING,
    propertyaddress2: DataTypes.STRING,
    primaryairportcode: DataTypes.STRING,
    cityid: DataTypes.INTEGER,
    propertystateprovinceid: DataTypes.INTEGER,
    propertyzippostal: DataTypes.STRING,
    propertyphonenumber: DataTypes.STRING,
    propertyfaxnumber: DataTypes.STRING,
    sabrepropertyrating: DataTypes.STRING,
    propertylatitude: DataTypes.DECIMAL,
    propertylongitude: DataTypes.DECIMAL,
    sourcegroupcode: DataTypes.STRING
}, {
    tableName: 'hotels',
    timestamps: false,
})

module.exports = Hotel;