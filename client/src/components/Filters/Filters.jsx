import { useDispatch } from "react-redux";
import "./Filters.css"
import { useEffect, useState } from "react";
import { orderByName, orderSource } from "../../redux/actions";
import React from "react";
import { getAllDrivers } from "../../redux/actions";
import { orderByAge } from "../../redux/actions";


export default function Filters({ allTeams,filterDriversTeam }) {
    const dispatch = useDispatch();

    //* orden alfabetico
    const [orderType, setOrderType] = useState("");

    const handleOrderChange = (e) => {
        setOrderType(e.target.value);
        dispatch(orderByName(e.target.value));
    };

    //* ---------------------------------------

    // Estado local para el equipo seleccionado
    const [selectedTeam, setSelectedTeam] = useState("");
    
     // Efecto secundario para filtrar conductores cuando cambia el equipo seleccionado
    useEffect(() => {
        if (selectedTeam) { // Si hay un equipo seleccionado
            filterDriversTeam(selectedTeam);
        }
    }, [selectedTeam, filterDriversTeam]);

    const handleResetFilter = () => {
        // Reiniciar los filtros estableciendo el tipo de orden y el equipo seleccionado en sus valores predeterminados
        setOrderType("");
        setSelectedTeam("");
        setApiDbFilter("");
        // Obtener todos los conductores nuevamente para restaurar la lista original
        dispatch(getAllDrivers());
    };

    const [ageOrderType, setAgeOrderType] = useState("");

    const handleAgeOrderChange = (event) => {
        const selectedValue = event.target.value.trim();
        setAgeOrderType(selectedValue);
        dispatch(orderByAge(selectedValue));
    };

    const [apiDbFilter, setApiDbFilter] = useState("All");

    const handleApiDbFilterChange = (e) => {
        setApiDbFilter(e.target.value);
        dispatch(orderSource(e.target.value));
    }


    return(
        <div className="filters-container">
            <h1>Filters</h1>
            <div className="options">
            <select value={orderType} onChange={handleOrderChange}  >
                <option value="Alphabetic Order" placeholder="Alphabetic Order"  >
                    Alphabetic Order
                </option>
                <option value="A">A - Z</option>
                <option value="D">Z - A</option>
            </select>

            </div>
            
            <div className="options">
            <select value={selectedTeam} onChange={event => setSelectedTeam(event.target.value)} >
                <option value="" >
                    Teams
                </option>
                {allTeams?.map((team, index) => (
                    <option key={index} value={team} > {team} </option>
                ))}
            </select>

            </div>
            <div className="options">
            <select value={ageOrderType} onChange={handleAgeOrderChange} >
                <option>
                    Order by Age
                </option>
                <option value="age ⬇">Menor edad</option>
                <option value="age ⬆">Mayor edad</option>
            </select>

            <select value={apiDbFilter} onChange={handleApiDbFilterChange} >
                <option>
                    Order by Source
                </option>
                <option value="All">All</option>
                <option value="Api">Api</option>
                <option value="DB">DB</option>
            </select>

            

            </div>
            <div className="reset">
                <button onClick={handleResetFilter}>Reset Filter</button>
            </div>
        </div>

    );
}