import { useDispatch } from "react-redux";
import "./Card.css"
import { useNavigate } from "react-router-dom";

export default function Card({ driver }) {

    const dispatch = useDispatch();
    const { id, name, dateOfBirth, nationality, teams, code, url, image } = driver;

    const navigate = useNavigate();

    const onClick = () => {
        // Navegar a la ruta absoluta del detalle del conductor
        navigate(`/drivers/${id}`);
      };


    return(
        <div className="card-container">
            <div className="card-header">
            <img src={image} alt={name} onClick={onClick} />

            </div>
            <div className="card-body">
            <h2> {name} </h2>
           
            </div>
            <div className="footer-card">
            <p>{nationality}</p>

            </div>
            
            

        </div>

    );
}