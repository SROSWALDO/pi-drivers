import { useState } from "react"
import { useDispatch } from "react-redux";

export default function Create(second) {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setimage] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [team, setTeam] = useState([]);

    const dispatch = useDispatch();


    return (
        <div className="create-container">
            <div className="form-container">
                <form >
                    <label>
                        Name:
                        <input type="text" />
                    </label>

                    <label>
                        Last name:
                        <input type="text" />
                    </label>

                    <label>
                        Nationality:
                        <input type="text" />
                    </label>

                    <label>
                        Birthdate:
                        <input type="text" />
                    </label>

                    <label>
                        Image:
                        <input type="text" />
                    </label>

                    <label>
                        Description:
                        <input type="text" />
                    </label>

                    <label>
                        Team:
                        <input type="text" />
                    </label>
                    
                </form>

            </div>

        </div>
    )
}