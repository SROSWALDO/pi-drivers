import axios from 'axios';
import { DRIVERS_FILTER, FILTER_BY_APIDB, FILTER_BY_DB, GET_DRIVER, GET_DRIVER_BY_NAME, GET_TEAMS } from './action-types';


const URL = 'http://localhost:3001/drivers'; 

export const getAllDrivers = () => { 
    return async (dispatch) => { // Retorna una función asíncrona que recibe dispatch como argumento
        try {
            const response = await axios.get(URL); // Realiza una solicitud GET para obtener los conductores
            dispatch({ type: GET_DRIVER, payload: response.data }); // Despacha una acción con los conductores obtenidos
        } catch (error) {
            console.error(error); 
        }
    }

}

export const getTeams = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/teams');
            dispatch({ type: GET_TEAMS, payload: response.data });
        } catch (error) {
            console.log(error);
            
        }
    }
}


export const getDriverByName = (name) => {
    return async (dispatch, getState) => {
        try {
            const { drivers } = getState();
            let driversToFilter = [];

            const lowerCaseName = name.toLowerCase();
            const URL = `http://localhost:3001/drivers/name?name=${lowerCaseName}`;

            // Verifica si hay conductores cargados en el estado global
            if (drivers.length > 0) {
                driversToFilter = drivers;
            } else {
                // Si no hay conductores cargados, obtiene todos los conductores de la API
                const response = await axios.get('http://localhost:3001/drivers');
                driversToFilter = response.data;
            }

            // Obtiene los conductores filtrados por nombre de la API
            const responseByName = await axios.get(URL);

            // Filtra los conductores locales por nombre
            const filteredDrivers = driversToFilter.filter((driver) =>
                driver.name.toLowerCase().includes(lowerCaseName)
            );

            // Despacha las acciones para actualizar el estado global
            dispatch({ type: GET_DRIVER_BY_NAME, payload: responseByName.data });
            dispatch({ type: DRIVERS_FILTER, payload: filteredDrivers });
            
        } catch (error) {
            console.log(error);
        }
    }
}

/*
GET_DRIVER_BY_NAME se encarga de obtener los conductores del servidor que coinciden con el nombre especificado. Es decir, realiza la búsqueda en el servidor basada en el nombre y actualiza el estado global con los datos obtenidos del servidor.

Una vez que se obtienen los datos del servidor, DRIVERS_FILTER se encarga de filtrar los conductores ya existentes en el estado global basándose en el nombre de búsqueda especificado localmente en el cliente. Esto significa que filtra la lista de conductores que ya se han cargado en el cliente, en lugar de realizar una nueva solicitud al servidor. Este filtro se aplica a la lista existente de conductores en el cliente y actualiza el estado global con los conductores filtrados.


en tu componente Home, la información que se renderiza proviene del estado global de Redux, específicamente de la propiedad drivers. Esta propiedad se actualiza mediante la acción DRIVERS_FILTER, que filtra los conductores existentes en el estado global basándose en el nombre de búsqueda especificado localmente en el cliente.

Por lo tanto, la información que se muestra en tu componente Home está filtrada según el nombre de búsqueda especificado en el campo de búsqueda del componente Nav.
 */

export const filterDrivers = (team) => {
    return async (dispatch) => {
        try {
            // Obtener todos los conductores de la API
            const response = await axios.get('http://localhost:3001/drivers'); // Obtener todos los conductores de la API
            const allDrivers = response.data;

            /*
            La condición de filtrado comprueba si el conductor tiene un campo teams definido y si el equipo pasado como argumento está incluido en el array de equipos del conductor (driver.teams.includes(team)).
             */

            const filteredDrivers = allDrivers.filter((driver) => driver.teams && driver.teams.includes(team));
            //Los conductores filtrados se almacenan en la variable filteredDrivers.

            dispatch({ type: DRIVERS_FILTER, payload: filteredDrivers }); //payload - conductores filtrados

        } catch (error) {
            console.log(error);
        }
    };
};
//En resumen, esta acción filterDrivers realiza una solicitud a la API para obtener todos los conductores, filtra los conductores por el equipo proporcionado y luego envía los conductores filtrados al store de Redux para su actualización en la aplicación.



export const orderByName = (orderType) => {
    return async (dispatch, getState) => {
        try {
            const drivers = getState().drivers;
            let orderedDrivers;

            if (orderType === 'A') {
                orderedDrivers = [...drivers].sort((a, b) => a.name.localeCompare(b.name));
            } else if( orderType === 'D') {
                orderedDrivers = [...drivers].sort((a, b) => b.name.localeCompare(a.name));
            } else {
                orderedDrivers = drivers;
            }

            dispatch({ type: 'ORDER_BY_NAME', payload: orderedDrivers });

        } catch (error) {
            console.log(error);
        }
    };
};

export const getAgeFromDOB = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const orderByAge = (orderType) => {
    return async (dispatch, getState) => {
        try {
            const drivers = getState().drivers;

            let orderedDrivers;

            if (orderType.toLowerCase() === 'age ⬇') {
                orderedDrivers = [...drivers].sort((a, b) => {
                    const ageA = getAgeFromDOB(a.dateOfBirth);
                    const ageB = getAgeFromDOB(b.dateOfBirth);
                    return ageA - ageB;
                });
            } else if (orderType.toLowerCase() === 'age ⬆') {
                orderedDrivers = [...drivers].sort((a, b) => {
                    const ageA = getAgeFromDOB(a.dateOfBirth);
                    const ageB = getAgeFromDOB(b.dateOfBirth);
                    return ageB - ageA;
                });
            } else {
                orderedDrivers = drivers;
            }

            dispatch({ type: 'ORDER_BY_AGE', payload: orderedDrivers })

        } catch (error) {
            console.log(error);
        }
    }
}


export const orderSource = (idType) => {
    return {
        type: FILTER_BY_APIDB,
        payload: idType,
      };
};


// Función auxiliar para obtener el peso promedio desde el rango


export const createDriver = (driver) => {
    return async (dispatch) => {
        try {
            await axios.post("http://localhost:3001/drivers", driver);
        } catch (error) {
            window.alert(error);
            
        }
    };
};

export const orderBy = (orderBy) => {
    return {
        type: 'ORDER_BY',
        payload: orderBy
    };
};