const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Review = sequelize.define('Review', {
    ratingid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reviewid : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    criteria : {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ratingvalue : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    tableName: 'review_ratings',
    timestamps: false,
});

module.exports = Review;