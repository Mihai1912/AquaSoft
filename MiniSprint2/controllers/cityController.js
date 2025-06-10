const City = require('../models/city');

const getAllCities = async (req, res) => {
    const cities = await City.findAll();
    res.json(cities);
}

const getCity = async (req, res) => {
    const cityId = req.params.id;

    try {
        const city = await City.findByPk(cityId);

        if(!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.json(city);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching city' , error: err.message });
    }
}

const createCity = async (req, res) => {
    const { cityname, country } = req.body;

    try {
        const exists = await City.findOne({
            where: {cityname: cityname}
        });

        if (exists) {
            return res.status(404).json({ message: 'City already exists' });
        }

        const newCity = await City.create({
            cityname: cityname,
            country: country
        })

        res.status(201).json({
            message: 'City created successfully',
            city: {
                id: newCity.id,
                cityname: newCity.cityname,
                country: newCity.country,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating city' , error: err.message });
    }
}

module.exports = {
    getAllCities,
    getCity,
    createCity
}