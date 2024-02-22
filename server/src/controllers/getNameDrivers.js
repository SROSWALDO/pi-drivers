const axios = require('axios');
const { Driver, Team } = require('../db');
const { Op } = require('sequelize');

const URL = 'http://localhost:5000/drivers';
//aqui ya traje axios que es el que usare para las solicitudes
// meti la url es una const llamada URL

//hacer la funcion asincronica para obtener la informacion del conductor mediante el name

const getDriverByName = async (name) => {
    try {
        //haremos la solicitud get a la url de la api
        const { data } = await axios.get(URL);

        //tenemos que filtrar los paises que coincidan con el nombre
        const filterDrivers = data.filter(driver => (driver.name.forename.toLowerCase().includes(name.toLowerCase()) || driver.name.surname.toLowerCase().includes(name.toLowerCase())));


        //si no se encunetra nigun conductor que coincida que lanze un error
        if(filterDrivers.length === 0){
            throw new Error('Driver not found')
        }

        //mapeamos los datos de los drivers para renderizarlos
        const driverData = filterDrivers.map(driver => ({
            id: driver.id,
            name:`${driver.name.forename} ${driver.name.surname}`,
            dateOfBirth: driver.dob,
            nationality: driver.nationality,
            url: driver.url,
            code: driver.code,
            teams: driver.teams 
        }))

        //buscar la info del conductor en la db
        const driverDB = await Driver.findOne({
            where: { name: { [Op.iLike]: `%${name}%`   } }, //buscar el nombre del driver ignorando  mayus y minus
            include: {
                model: Team,
            }
        })

        //si encontramos informacion del conductor en la db, se agregan las actividades al objeto driverdb

        if(driverDB) {
            driverDB[0].teams = driverDB.teams.map(team => ({
                id: team.id,
                name: team.name
            }));
        }

        return driverData;
        
    } catch (error) {
        console.log('Error en getDriverByNme:', error);
        throw error;
        
    }
}

module.exports = getDriverByName;
