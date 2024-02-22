const axios = require('axios'); // Importa la librería Axios para hacer solicitudes HTTP
const { Driver, Team } = require('../db'); // Importa los modelos Driver y Team de la base de datos

const URL = 'http://localhost:5000/drivers'; // URL de la API externa que proporciona información sobre los conductores

// Función asincrónica para obtener todos los conductores
const getAllDriver = async () => {
    try {
        // Realiza una solicitud GET a la URL de la API externa para obtener datos sobre los conductores
        const { data } = await axios.get(URL);

        // Mapea los datos de los conductores de la API externa para formatearlos adecuadamente
        const apiDrivers = data.map(driver => ({
            id: driver.id,
            name: `${driver.name.forename} ${driver.name.surname}`, // Combina el nombre y el apellido del conductor en un solo campo
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
                model: Team, // Incluye información sobre los equipos asociados a cada conductor
            }
        });

        // Combina los datos de los conductores de la API externa y los de la base de datos local
        const allDrivers = [...apiDrivers, ...dbDrivers];

        // Devuelve todos los conductores
        return allDrivers;

    } catch (error) {
        // Maneja cualquier error que ocurra durante el proceso
        console.error(error);
        throw error; // Lanza el error para ser manejado en un nivel superior
    }
}

module.exports = getAllDriver; // Exporta la función getAllDriver para ser utilizada en otros archivos
