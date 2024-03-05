import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDriver, getTeams } from "../../redux/actions";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Create.css";

export default function Create() {
    const allTeams = useSelector((state) => state.teams);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [nationality, setNationality] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [team, setTeam] = useState([]);
    const [message, setMessage] = useState("");

    const [error, setError] = useState({ message: "", visible: false });


    const handleChange = (e) => {
        if (e.target.value && team.length < 3) {
            setTeam((prevTeams) => [...prevTeams, e.target.value]);
        }
    };

    const handleTeamRemove = (index) => {
        const updatedTeams = team.filter((_, i) => i !== index);
        setTeam(updatedTeams);
    };

    const handleImageChange = (e) => {
        const imageUrl = e.target.value;
        setImage(imageUrl);
    
        // Validar la URL de la imagen
        if (!isValidImageUrl(imageUrl)) {
            setError({ message: "Please enter a valid HTTP image URL.", visible: true });
        } else {
            setError({ message: "", visible: false });
        }
    };
    
    const isValidImageUrl = (url) => {
        // Expresión regular para verificar si la URL es válida
        const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        return regex.test(url);
    };

    const isValidName = (name) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name)
    }

    const handleNameChange = (e) => {
        const nameRes = e.target.value;
        setName(nameRes);
    
        // Validar la URL de la imagen
        if (!isValidName(nameRes)) {
            setError({ message: "Please enter a valid Name", visible: true });
        } else {
            setError({ message: "", visible: false });
        }
    };

    const isValidLastName = (lastname) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(lastname)
    }

    const handleLastNameChange = (e) => {
        const lastnameRes = e.target.value;
        setLastName(lastnameRes);
    
        // Validar la URL de la imagen
        if (!isValidLastName(lastnameRes)) {
            setError({ message: "Please enter a valid Last Name", visible: true });
        } else {
            setError({ message: "", visible: false });
        }
    };

    const isValidNationality = (nationality) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(nationality)
    }

    const handleNationalityChange = (e) => {
        const nationalityRes = e.target.value;
        setNationality(nationalityRes);
    
        // Validar la URL de la imagen
        if (!isValidNationality(nationalityRes)) {
            setError({ message: "Please enter a valid Nationality", visible: true });
        } else {
            setError({ message: "", visible: false });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all fields are filled
        if (!name || !lastName || !description || !image || !nationality || !dateOfBirth || team.length === 0) {
            alert("Please complete all fields");
            return;
        }

        if (name.length > 20 ) {
            window.alert("Debes escribir un nombre que tenga menos de 20 caracteres ");
            return;
        }
    
        // Check if the number of selected teams is not more than 3
        if (team.length > 3) {
            alert("Please select up to 3 teams.");
            return;
        }
    
        // Validate fields individually
        if (!isValidName(name)) {
            alert("Please enter a valid Name.");
            return;
        }
    
        if (!isValidLastName(lastName)) {
            alert("Please enter a valid Last Name.");
            return;
        }
    
        if (!isValidImageUrl(image)) {
            alert("Please enter a valid HTTP image URL.");
            return;
        }
    
        if (!isValidNationality(nationality)) {
            alert("Please enter a valid Nationality.");
            return;
        }
    
        const driverData = {
            name: name,
            lastName: lastName,
            description: description,
            image: image,
            nationality: nationality,
            dateOfBirth: dateOfBirth,
            teams: team,
        };
    
        dispatch(createDriver(driverData));
    
        setMessage("The driver has been created!! 🏎️ ");
        console.log(driverData);
    };

    return (
        <div className="create-container">
            <nav className="nav-return">
                <NavLink to="/home">
                    <button>Return to Home</button>
                </NavLink>
            </nav>
            

            <div className="form-container">
            {message && <p className="message-create" >{message}</p>}
            <p className="error-form" style={{ opacity: error.visible ? 1 : 0 }}>
                {error.message}
            </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name:
                        <input type="text" value={name} name="name" onChange={handleNameChange} placeholder="Enter your name..." />
                    </label>
                   

                    <label htmlFor="lastName">
                        Last name:
                        <input type="text" value={lastName} name="lastName" onChange={handleLastNameChange} placeholder="Enter your Lastname..." />
                    </label>
                    

                    <label htmlFor="nationality">
                        Nationality:
                        <input type="text" value={nationality} name="nationality" onChange={handleNationalityChange} placeholder="Example: Mexican" />
                    </label>

                    <label htmlFor="birthdate">
                        Birthdate:
                        <input type="date" value={dateOfBirth} name="birthdate" onChange={(e) => setdateOfBirth(e.target.value)} placeholder="xxxx-xx-xx" />
                    </label>

                    <label htmlFor="image">
                        Image:
                        <input type="text" value={image} name="image" onChange={handleImageChange} placeholder="image.jpg" />
                    </label>

                    <label htmlFor="description">
                        Description:
                        <input type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)} placeholder="Enter your description..." />
                    </label>

                    <div className="teams-form">
                        <label>
                            Team:
                            <select onChange={handleChange} disabled={team.length >= 3}>
                                <option value="">Teams</option>
                                {allTeams?.map((team, index) => (
                                    <option key={index} value={team}>
                                        {team}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="team">
                        {team?.map((tea, index) => (
                            <p className="selectedTeam" key={index} value={tea} onClick={() => handleTeamRemove(index)}>
                                {" "}
                                {tea}
                            </p>
                        ))}
                    </div>

                    <input type="submit" className="btn-create" value="Submit" />
                    
                </form>
            </div>
        </div>
    );
}
