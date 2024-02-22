const getIDDrivers = require('../controllers/getIDDrivers');

const getIDDriversHandler = async (req, res) => {
    const { id } = req.params; // Obtén el parámetro de la URL que contiene el ID del conductor
    try {
        const driver = await getIDDrivers(id); // Llama a la función getIDDrivers para obtener los datos del conductor
        res.status(200).json(driver); // Devuelve los datos del conductor en formato JSON
    } catch (error) {
        console.error("Error in getIDDriversHandler:", error.message);
        res.status(500).json({ error: 'Internal server error' }); // Devuelve un mensaje de error si ocurre algún problema
    }
};

module.exports = getIDDriversHandler; // Exporta el controlador para ser utilizado en otros archivos
