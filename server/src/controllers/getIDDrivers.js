const axios = require('axios');
const { Driver, Team } = require('../db');

const URL = 'http://localhost:5000/drivers';

const getIDDrivers = async (id) => {
    try {
        let driverData;
        let isUUID = false;

        
        if (id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
            
            driverData = await Driver.findByPk(id, { include: Team });
            isUUID = true;
        } else {
            // If it's not a UUID, fetch data from the API
            const response = await axios.get(URL);
            driverData = response.data.find(driver => driver.id === parseInt(id));
        }

        if (!driverData) {
            throw new Error('Driver not found');
        }

        let formattedData;

        if (isUUID) {
            // Leave data from database unchanged
            const fullNameDB = `${driverData.name} ${driverData.lastName} `
            formattedData = {
                id: driverData.id,
                name: fullNameDB,
                lastName: driverData.lastName,
                description: driverData.description,
                image: driverData.image,
                nationality: driverData.nationality,
                dateOfBirth: driverData.dateOfBirth,
                teams: driverData.Teams ? driverData.Teams.map(team => team.name).join(', ') : '' // Handle potential undefined Teams
            };
        } else {
            // Format data from API as needed
            const fullName = `${driverData.name.forename} ${driverData.name.surname}`;
            formattedData = {
                id: driverData.id,
                name: fullName,
                description: driverData.description || `${fullName} is a Big Driver of F1`,
                image: driverData.image.url,
                nationality: driverData.nationality,
                dateOfBirth: driverData.dob,
                url: driverData.url,
                code: driverData.code,
                teams: driverData.teams
            };
        }

        return formattedData;
    } catch (error) {
        console.error("Error in getIDDrivers:", error.message);
        throw error;
    }
};

module.exports = getIDDrivers;
