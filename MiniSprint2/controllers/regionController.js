const Region = require('../models/region');

const getAllRegions = async (req, res) => {
    try {
        const regions = await Region.findAll();
        res.json(regions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching regions', error: err.message });
    }
};

const getRegion = async (req, res) => {
    const regionId = req.params.id;

    try {
        const region = await Region.findByPk(regionId);

        if (!region) {
            return res.status(404).json({ message: 'Region not found' });
        }

        res.json(region);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching region', error: err.message });
    }
};

const createRegion = async (req, res) => {
    const { propertystateprovincename } = req.body;

    try {
        const exists = await Region.findOne({
            where: { propertystateprovincename }
        });

        if (exists) {
            return res.status(400).json({ message: 'Region already exists' });
        }

        const newRegion = await Region.create({ propertystateprovincename });

        res.status(201).json({
            message: 'Region created successfully',
            region: {
                id: newRegion.propertystateprovinceid,
                name: newRegion.propertystateprovincename,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating region', error: err.message });
    }
};

module.exports = {
    getAllRegions,
    getRegion,
    createRegion
};
