const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Review = sequelize.define('Review', {
    reviewid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    globalpropertyid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reviewtitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    reviewtext: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    reviewrating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    reviewdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'reviews',
    timestamps: false,
});

module.exports = Review;