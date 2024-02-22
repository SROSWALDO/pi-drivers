// Definición del Reducer
const initialState = {
    drivers: [], // Estado inicial con un arreglo vacío de conductores
    teams: [],
}
const reducer = (state = initialState, action) => { // Define el reducer que maneja las acciones
    switch (action.type) {
        case "GET_DRIVERS": // Maneja la acción GET_DRIVERS
            return {
                ...state, // Retorna una copia del estado actual
                drivers: action.payload // Actualiza el estado con los conductores obtenidos
            }
        case "GET_TEAMS":
            return {
                ...state,
                teams: action.payload
            }    
        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                drivers: action.payload
            }
        case "DRIVERS_FILTER":
            return{
                ...state,
                drivers: action.payload
            }
        case "ORDER_BY_NAME":
        return{
            ...state,
            drivers: action.payload
        }
        case "ORDER_BY_AGE":
        return{
            ...state,
            drivers: action.payload
        }            
        default:
            return state; // Retorna el estado actual si la acción no coincide
    }
}
export default reducer; // Exporta el reducer como el valor por defecto