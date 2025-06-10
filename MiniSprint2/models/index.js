const sequelize = require('./db');
const Hotel = require('./hotel');
const City = require('./city');
const Region = require('./region');

// RELAȚII
Hotel.belongsTo(City, { foreignKey: 'cityid' });
City.hasMany(Hotel, { foreignKey: 'cityid' });

Hotel.belongsTo(Region, { foreignKey: 'propertystateprovinceid' });
Region.hasMany(Hotel, { foreignKey: 'propertystateprovinceid' });

module.exports = {
  sequelize,
  Hotel,
  City,
  Region
};
