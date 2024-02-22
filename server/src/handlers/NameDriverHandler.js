const getNameDrivers = require('../controllers/getNameDrivers');

const getNameDriverHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const driverData = await getNameDrivers(name);

        if(driverData.length === 0) {
            return res.status(404).json({ success: false, error: 'Country not found' });
        }

        return res.json({ success: true, data: driverData });
    } catch (error) {
        console.log('Error in getNameDriverHandler', error);
        return res.status(500).json({ success: false, error: 'Internal server Error' })
        
    }
}

module.exports = getNameDriverHandler;