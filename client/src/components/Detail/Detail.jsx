import React from "react";
import'./Detail.css';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/logo-f1.png"


export default function Detail() {

    const { id } = useParams(); //con esto extraemos el parametro id de la url por ejemplo '1','23'

    const URL = `http://localhost:3001/drivers/${id}`;
    const [driver, setDriver] = useState({});

    useEffect(() => {
        // Función asincrónica que realiza la solicitud HTTP GET para obtener los detalles del conductor
        const fetchData = async () => {
            try {
                // Realiza la solicitud HTTP GET a la URL y espera la respuesta
                const response = await axios.get(URL);
                const responseData = response.data; // Obtiene el objeto de datos de la respuesta
                console.log(responseData, "data");
        
                // Verifica si se recibieron datos del conductor
                if (responseData) {
                    setDriver(responseData); // Actualiza el estado con los datos del conductor
                } else {
                    alert(`No existe conductor con el ID: ${id}`); // Muestra una alerta si no se encontraron datos
                }
            } catch (error) {
                console.error("Error al obtener datos del conductor:", error); // Maneja cualquier error ocurrido durante la solicitud
                alert("Error al obtener datos del conductor. Inténtalo de nuevo más tarde."); // Muestra una alerta de error
            }
        };
        fetchData(); // Llama a la función fetchData para realizar la solicitud HTTP cuando el componente se monta o cuando cambia el 'id'
    }, [id, URL]); // Define las dependencias del efecto (el 'id' y la URL)


    return (
        <>
            {driver.name ? (
                <div className="detail-container">
                    
                    <div className="nav-container">
                        <div className="logo">
                            <NavLink to='/'>
                            <img src={logo} alt="Logo" />
                            </NavLink>
                        </div>
                        <div className="btn-home">
                            <NavLink to='/home'>
                            <button>Home</button>
                            </NavLink>
                        </div>
                        <div className="button-about">
                            <button>Contact</button>
                        </div>
                    </div>
                    
                    <div className="card-detail">
                        <div className="image-detail">
                           
                            <img src={driver.image} alt={driver.name} className="image-detail" />
                        </div>
                        <div className="text-detail">
                           
                            <h2>{driver.name}</h2>
                            <p>{driver.dateOfBirth}</p>
                            <p>{driver.nationality}</p>
                            <p>{driver.description}</p>
                            <p>Teams:</p>
                            <p>{driver.teams}</p>
                        </div>
                    </div>
                </div>
            ) : (
                
                <div className="loading-detail">
                    <p>Loading....</p>
                </div>
            )}
        </>
    );
    
}