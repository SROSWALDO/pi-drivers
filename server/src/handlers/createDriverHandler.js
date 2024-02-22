const { createDriver } = require("../controllers/createDriver");

const createDriverHandler = async (req, res) => {
  try {
    const driverData = req.body; // Obtener los datos del conductor del cuerpo de la solicitud
    const newDriver = await createDriver(driverData); // Llamar al controlador para crear el conductor

    // Enviar una respuesta con el nuevo conductor creado
    res.status(201).json(newDriver);
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    // Enviar una respuesta de error si ocurre algún problema durante la creación del conductor
    res.status(500).json({ error: "Error al crear el conductor" });
  }
};

module.exports = {
  createDriverHandler
};
