import Card from "../Card/Card";
import "./Cards.css"

export default function Cards({ drivers, onClick }) {
    return(
        <div className="cards-container">
            {drivers.map((driver, index) => (
                <Card  key={index} driver={driver} onClick={onClick} />
            ))}

        </div>

    );
}