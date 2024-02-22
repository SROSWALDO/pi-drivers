import "./Nav.css"
import logo from "../../assets/logo-f1.png"
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Nav({ onSearch }) {

    const [name, setName] = useState(""); // Estado local para almacenar el valor del campo de búsqueda

    // Maneja el cambio en el campo de búsqueda
    const handleChange = (event) => {
        const { value } = event.target;
        setName(value); // Actualiza el estado con el valor del campo de búsqueda
        onSearch(value); // Llama a la función de búsqueda pasada como prop con el valor actual del campo de búsqueda
    }

    // Maneja el clic en el botón de búsqueda
    const handleClick = (event) => {
        event.preventDefault();

        if(name.trim() === "") { // Verifica si el campo de búsqueda está vacío
            alert("porfavor, ingresa un nombre para la busqueda"); // Muestra una alerta si el campo está vacío
            return;
        }

        onSearch(name); // Llama a la función de búsqueda pasada como prop con el valor actual del campo de búsqueda
        setName(""); // Restablece el estado del campo de búsqueda a una cadena vacía
    }

    return(
        <div className="nav-container">
            <div className="logo">
                <NavLink to="/">
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>

            <div className="links">
                <div className="search">
                    <input
                        type="search"
                        id="search"
                        name="search"
                        value={name}
                        onChange={handleChange} // Maneja el cambio en el campo de búsqueda
                        placeholder='Search...'
                    />

                    <button onClick={handleClick}>Find</button> {/* Maneja el clic en el botón de búsqueda */}
                </div>
            </div>

            <div className="button-about">
                <button>About Me</button>
            </div>
        </div>
    );
}
