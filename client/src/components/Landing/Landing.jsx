import "./Landing.css"
import logo from "../../assets/logo-f1.png"
import { NavLink } from "react-router-dom"
import Car from "../../assets/car-f1.png"

export default function Landing(second) {
    return(
        <div className="landing-container">
            <div className="nav-container">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="button-about">
                <NavLink to="/about" >
                <button>Contact</button>
                </NavLink>
            </div>
        </div>
        <div className="landing-body">
            <div className="text">
            <div className="title-api">
                    <p>drivers API</p>
                </div>
                <div className="description">
                    <h2>Find your favorite driver <span className='to'>to learn more about</span> <span className='play'>him</span></h2>
                    <p>
                    Search your favorite drivers and find the information you need. You can also find the latest news and the best drivers of the moment.
                    </p>

                </div>

                <div className="btn-landing">
                <NavLink to="/home" className="btn">
           <button className='button'>
            <span className="button-text"></span> RUN!
         </button>
               </NavLink>

                </div>

            </div>

            <div className="landing-image">
                <img src={Car} alt="" />

            </div>

        </div>
            
           
        
        </div>
    )
}