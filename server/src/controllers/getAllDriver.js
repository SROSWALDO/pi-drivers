const axios = require('axios'); 
const { Driver, Team } = require('../db'); 

const URL = 'http://localhost:5000/drivers'; 

// Función asincrónica para obtener todos los conductores
const getAllDriver = async () => {
    try {
        // Realiza una solicitud GET a la URL de la API externa para obtener datos sobre los conductores
        const { data } = await axios.get(URL);

        // Mapea los datos de los conductores de la API 
        const apiDrivers = data.map(driver => ({
            id: driver.id,
            name: `${driver.name.forename} ${driver.name.surname}`, 
            image: driver.image.url,
            dateOfBirth: driver.dob,
            nationality: driver.nationality,
            url: driver.url,
            code: driver.code,
            teams: driver.teams,
        }));
        
        // Busca todos los conductores en la base de datos local, incluyendo la asociación con los equipos
        const dbDrivers = await Driver.findAll({
            include: {
                model: Team, 
            }
        });

        //

        const driversOfDB = dbDrivers.map(driver => {
            const fullNameDB = `${driver.name} ${driver.lastName}`;
            return{
                id:driver.id,
                name: fullNameDB,
                lastName:driver.lastName,
                description:driver.description,
                image: driver.image,
                nationality: driver.nationality,
                dateOfBirth: driver.dateOfBirth,
                teams: driver.Teams ? driver.Teams.map(team => team.name).join(', ') : '' 
            }
        })

        // Combina los datos de los conductores de la API extersadsna y los de la base de datos local
        const allDrivers = [...driversOfDB,...apiDrivers];

        // Devuelve todos los conductores
        return allDrivers;

    } catch (error) {
        // Maneja cualquier error que ocurra durante el proceso
        console.error(error);
        throw error; // Lanza el error para ser manejado en un nivel superior
    }
}

module.exports = getAllDriver; // Exporta la función getAllDriver para ser utilizada en otros archivos
