const axios = require('axios'); // Importamos el módulo axios para hacer solicitudes HTTP
const { Team } = require("../db"); // Importamos el modelo Team desde el archivo db.js

const getAllTeams = async () => { // Definimos una función asíncrona llamada getAllTeams
    const URL = 'http://localhost:5000/drivers'; // URL de la API de conductores
    const { data } = await axios.get(URL); // Hacemos una solicitud GET a la API y obtenemos los datos

    let teams = []; // Inicializamos un array vacío para almacenar los nombres de equipos únicos

    data.forEach(driver => { // Iteramos sobre cada conductor en los datos obtenidos
        
        if (typeof driver.teams === 'string') { // Verificamos si el campo teams es una cadena de texto
            const driverTeams = driver.teams.split(',').flatMap(team => team.split(', ')); // Dividimos el campo teams por comas y espacios
            driverTeams.forEach(team => { // Iteramos sobre cada equipo obtenido
                const trimmedTeam = team.trim(); // Eliminamos espacios en blanco al principio y al final del nombre del equipo
                const cleanedTeam = trimmedTeam.replace(/–|-/g, ''); // Eliminamos guiones medios y bajos del nombre del equipo
                if (!teams.includes(cleanedTeam)) { // Verificamos si el equipo no está en la lista de equipos
                    teams.push(cleanedTeam); // Agregamos el equipo a la lista de equipos únicos
                }
            });
        }
    });

    teams.sort(); // Ordenamos alfabéticamente los nombres de los equipos

    for (let team of teams) { // Iteramos sobre cada equipo único
        await Team.findOrCreate({ where: { name: team } }); // Buscamos o creamos el equipo en la base de datos
    }

    const dbTeams = await Team.findAll({ // Obtenemos todos los equipos de la base de datos
        order: [
            ['name', 'ASC'] // Ordenamos los equipos alfabéticamente
        ]
    });

    let dbTeamsNames = dbTeams.map(team => team.name); // Obtenemos solo los nombres de los equipos de la base de datos

    return dbTeamsNames; // Devolvemos los nombres de equipos obtenidos
};

module.exports = getAllTeams; // Exportamos la función getAllTeams para que esté disponible fuera de este archivo
