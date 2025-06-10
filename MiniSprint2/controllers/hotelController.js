const Hotel = require('../models/hotel');
const City = require('../models/city');
const Region = require('../models/region')

const getAllHotels = async (req, res) => {
    const hotels = await Hotel.findAll();
    res.json(hotels);
}

const getHotel = async (req, res) => {
    const hotelglobalpropertyname = req.params.globalpropertyname;

    try{
        const hotel = await Hotel.findOne({
            where: {globalpropertyname: hotelglobalpropertyname}
        });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching hotel', error: err.message });
    }
}

const createHotel = async (req, res) => {
    const { globalpropertyid, sourcepropertyid ,globalpropertyname ,globalchaincode,
            propertyaddress1, propertyaddress2 ,primaryairportcode ,cityid ,
            propertystateprovinceid, propertyzippostal, propertyphonenumber,
            propertyfaxnumber, sabrepropertyrating, propertylatitude,
            propertylongitude, sourcegroupcode
    } = req.body;

    try {

        const city = await City.findByPk(cityid);

        if (city) {
            return res.status(409).json({ message: 'City does not exists'})
        }

        const region = await Region.findByPk(propertystateprovinceid);

        if (region) {
            return res.status(409).json({ message: 'Region does not exists'})
        }

        const exist = await Hotel.findByPk(globalpropertyid);

        if (exist) {
            return res.status(409).json({ message : "Hotel already exists"})
        }

        const newHotel = await Hotel.create({
            globalpropertyid, 
            sourcepropertyid,
            globalpropertyname,
            globalchaincode,
            propertyaddress1, 
            propertyaddress2,
            primaryairportcode,
            cityid ,
            propertystateprovinceid,
            propertyzippostal,
            propertyphonenumber,
            propertyfaxnumber,
            sabrepropertyrating,
            propertylatitude,
            propertylongitude,
            sourcegroupcode
        })

        res.status(201).json({ 
            message: 'Hotel created successfully',
            hotel: {
                globalpropertyid: newHotel.globalpropertyid,
                sourcepropertyid: newHotel.sourcepropertyid,
                globalpropertyname: newHotel.globalpropertyname,
                globalchaincode: newHotel.globalchaincode,
                propertyaddress1: newHotel.propertyaddress1,
                propertyaddress2: newHotel.propertyaddress2,
                primaryairportcode: newHotel.primaryairportcode,
                cityid: newHotel.cityid,
                propertystateprovinceid: newHotel.cityid,
                propertyzippostal: newHotel.propertyzippostal,
                propertyphonenumber: newHotel.propertyphonenumber,
                propertyfaxnumber: newHotel.propertyfaxnumber,
                sabrepropertyrating: newHotel.sabrepropertyrating,
                propertylatitude: newHotel.propertylatitude,
                propertylongitude: newHotel.propertylongitude,
                sourcegroupcode: newHotel.sourcegroupcode
            }
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error createing hotel',
            error: err.message,
        });
    }
}

const updateHotel = async (req, res) => {
    const hotelId = req.params.id;

    const { sourcepropertyid ,globalpropertyname ,globalchaincode,
            propertyaddress1, propertyaddress2 ,primaryairportcode ,cityid ,
            propertystateprovinceid, propertyzippostal, propertyphonenumber,
            propertyfaxnumber, sabrepropertyrating, propertylatitude,
            propertylongitude, sourcegroupcode
    } = req.body;

    try {
        const hotel = await Hotel.findByPk(hotelId);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const city = await City.findByPk(cityid);

        if (city) {
            return res.status(409).json({ message: 'City does not exists'})
        }

        const region = await Region.findByPk(propertystateprovinceid);

        if (region) {
            return res.status(409).json({ message: 'Region does not exists'})
        }

        hotel.sourcepropertyid = sourcepropertyid ?? hotel.sourcepropertyid;
        hotel.globalpropertyname = globalpropertyname ?? hotel.globalpropertyname;
        hotel.globalchaincode = globalchaincode ?? hotel.globalchaincode;
        hotel.propertyaddress1 = propertyaddress1 ?? hotel.propertyaddress1;
        hotel.propertyaddress2 = propertyaddress2 ?? hotel.propertyaddress2;
        hotel.primaryairportcode = primaryairportcode ?? hotel.primaryairportcode;
        hotel.cityid = cityid ?? hotel.cityid;
        hotel.propertystateprovinceid = propertystateprovinceid ?? hotel.propertystateprovinceid;
        hotel.propertyzippostal = propertyzippostal ?? hotel.propertyzippostal;
        hotel.propertyphonenumber = propertyphonenumber ?? hotel.propertyphonenumber;
        hotel.propertyfaxnumber = propertyfaxnumber ?? hotel.propertyfaxnumber;
        hotel.sabrepropertyrating = sabrepropertyrating ?? hotel.sabrepropertyrating;
        hotel.propertylatitude = propertylatitude ?? hotel.propertylatitude;
        hotel.propertylongitude = propertylongitude ?? hotel.propertylongitude;
        hotel.sourcegroupcode = sourcegroupcode ?? hotel.sourcegroupcode;

        await hotel.save();

        res.json({
            message: 'Hotel updated successfully',
            hotel
        })

    } catch (err) {
        res.status(500).json({
            message: 'Error updateing hotel',
            error: err.message,
        });
    }
}

const deleteHotel = async (req, res) => {
    const hotelId = req.params.id;

    try{
        const hotel = await Hotel.findByPk(hotelId);

        if (!hotel) {
            return res.status(404).json({ meassge: 'Hotel not found' });
        }

        await hotel.destroy();

        res.json({ message: 'Hotel deleted successfully'})
    } catch (err) {
        res.status(500).json({
            message: 'Error deleteing hotel',
            error: err.meassge,
        })
    }
}

module.exports = {
    getAllHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel
}