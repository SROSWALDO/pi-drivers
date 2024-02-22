// Importaciones de librerías y archivos necesarios
import { compose } from "redux"; // Importa funciones de Redux para crear el store
import reducer from "./reducer"; // Importa el reducer personalizado
import { configureStore } from '@reduxjs/toolkit'; // Importa la función configureStore de Redux Toolkit


// Configuración del Redux Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Configura Redux DevTools
const store = configureStore({
    reducer: reducer, // Configura el reducer en el store
});
export default store; // Exporta el store como el valor por defecto