const sequelize = require('./db');
const Hotel = require('./hotel');
const City = require('./city');
const Region = require('./region');
const Review = require('./review');
const ReviewRating = require('./review_rating');

// RELAȚII
Hotel.belongsTo(City, { foreignKey: 'cityid' });
City.hasMany(Hotel, { foreignKey: 'cityid' });

Hotel.belongsTo(Region, { foreignKey: 'propertystateprovinceid' });
Region.hasMany(Hotel, { foreignKey: 'propertystateprovinceid' });

ReviewRating.belongsTo(Review, { foreignKey: 'reviewid' });
Review.hasMany(ReviewRating, { foreignKey: 'reviewid' });

Review.belongsTo(Hotel, { foreignKey: 'globalpropertyid' });
Hotel.hasMany(Review, { foreignKey: 'globalpropertyid' });

module.exports = {
  sequelize,
  Hotel,
  City,
  Region
};
