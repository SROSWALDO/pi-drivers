const { Driver, Team } = require("../db");

const createDriver = async (driverData) => {
  try {
    const { name, lastName, description, image, nationality, dateOfBirth, teams } = driverData; 
   console.log(driverData,"Driver data en create driver");
    // Crear el conductor en la base de datos
    const newDriver = await Driver.create({
      name:name ,
      lastName:lastName ,
      description: description ,
      image:image ,
      nationality:nationality ,
      dateOfBirth: dateOfBirth,
    });

    // Buscar los equipos en la base de datos
    const teamsFound = await Team.findAll({ where: { name: teams } });

    // Asignar los equipos encontrados al conductor
    await newDriver.addTeams(teamsFound);
    
    return newDriver;

  } catch (error) {
    console.error("Error al crear el conductor:", error);
    throw new Error("Error al crear el conductor: " + error.message);
  }
};

module.exports = {
  createDriver
};
