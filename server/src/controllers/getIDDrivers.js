const axios = require('axios');
const { Driver, Team } = require('../db');

const URL = 'http://localhost:5000/drivers';

const getIDDrivers = async (id) => {
    try {
        let driverData;
        let isUUID = false;

        // Check if the ID is a UUID
        if (id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
            // If it's a UUID, search in the local database
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

        const fullName = `${driverData.name.forename} ${driverData.name.surname}`;

        let teamsFormatted;
        if (isUUID) {
            teamsFormatted = driverData.Teams.map(team => team.name).join(', ');
        } else {
            teamsFormatted = driverData.teams;
        }

        const formattedData = {
            id: isUUID ? driverData.id : parseInt(driverData.id),
            name: fullName,
            image: driverData.image.url,
            dateOfBirth: driverData.dob,
            nationality: driverData.nationality,
            url: driverData.url,
            code: driverData.code,
            teams: teamsFormatted,
            description: driverData.description || `${fullName} is a Big Driver of F1`
        };

        return formattedData;
    } catch (error) {
        console.error("Error in getIDDrivers:", error.message);
        throw error;
    }
};

module.exports = getIDDrivers;
