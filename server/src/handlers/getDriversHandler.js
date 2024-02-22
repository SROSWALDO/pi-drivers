const getAllDrivers = require('../controllers/getAllDriver');

const getDriversHandler = async (req, res) => {
    try {
        const drivers = await getAllDrivers();
        res.status(200).json(drivers);
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getDriversHandler;