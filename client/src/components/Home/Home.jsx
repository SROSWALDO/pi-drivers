import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDrivers, getAllDrivers, getDriverByName, getTeams } from "../../redux/actions";
import Cards from "../Cards/Cards";
import "./Home.css";
import Pagination from "../Pagination/Pagination";
import Nav from "../Nav/Nav";
import Filters from "../Filters/Filters";
import Loading from "../Loading/Loading";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allDrivers = useSelector((state) => state.drivers);
    const allTeams = useSelector((state) => state.teams);

    const filterDriversTeam = (team) => {
        dispatch(filterDrivers(team));
    }
 
    const onClick = (id) => {
        navigate(`drivers/${id}`)
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const cardsForPage = 10;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllDrivers());
                await dispatch(getTeams());
            } catch (error) {
                window.alert("Error: ", error)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2500);
            }
        }

        fetchData();
    }, [dispatch]);

    const startIndex = (currentPage - 1) * cardsForPage;
    const endIndex = currentPage * cardsForPage;

    // Filtra los conductores según el término de búsqueda actual
    const filteredDrivers = allDrivers.filter(driver => {
        return driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Obtiene la lista de conductores a mostrar en la página actual
    const driversList = filteredDrivers.slice(startIndex, endIndex);

    // Maneja el cambio de página
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Maneja la búsqueda de conductores por nombre
    const handleSearch = (name) => {
        setSearchTerm(name);
    };

    return (
        <div className="home">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Nav onSearch={handleSearch} />
                    <div className="home-container">
                    {filteredDrivers.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                cardsForPage={cardsForPage}
                                totalCards={filteredDrivers.length}
                                onPageChange={onPageChange}
                            />
                        )}
                        <div className="combination">
                            {/* Condición para renderizar los filtros solo cuando hay conductores */}
                            {filteredDrivers.length > 0 && <Filters allDrivers={allDrivers} allTeams={allTeams} filterDriversTeam={filterDriversTeam} />}
                            {/* Renderiza una lista de conductores si la lista filtrada no está vacía */}
                            {filteredDrivers.length > 0 ? (
                                <Cards drivers={driversList} onClick={onClick} />
                            ) : (
                                // Renderiza un mensaje indicando que no se encontraron conductores
                                <h1 className="no">No se encontraron conductores</h1>
                            )}
                        </div>

                        {/* Condición para renderizar la paginación solo cuando hay conductores */}
                        
                    </div>
                </>
            )}
        </div>
    );
}
