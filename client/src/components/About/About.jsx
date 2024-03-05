import React from "react";
import "./About.css";
import imageAbout from "../../assets/Avatar_F!.png";
import { NavLink } from "react-router-dom";
import github from "../../icons/Github.svg"
import linkedin from "../../icons/Linkedin.svg"
import twitter from "../../icons/Twitter.svg"
import whatsapp from "../../icons/WhatsApp.svg"

export default function About() {

  const phoneNumber = "4426665226"; // Reemplaza esto con tu número de teléfono

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };


  return (
    <>
    
      <div className="about-container">
      
        <div className="about-overlay"></div> {/* Capa oscura */}
        <div className="about-text">
          <h1>Hi! my name is oswaldo</h1>
          <p>
            I am currently a Henry student, I like basketball and video games
            and I will be a future full stack programmer
          </p>

          <div className="socials">
            <NavLink to="https://github.com/SROSWALDO" target="_blank" >
            <img className="git" src={github} alt="" />
            </NavLink>
            <NavLink to="https://www.linkedin.com/in/oswaldo-palacios-perez-523887270/"  target="_blank">
            <img className="git" src={linkedin} alt="" />
            </NavLink>
            <NavLink to="https://twitter.com/OswaldoDevelop" target="_blank"  >
            <img className="git" src={twitter} alt="" />
            </NavLink>
            <NavLink>
            <img className="git" src={whatsapp} onClick={handleWhatsAppClick} alt="" />
            </NavLink>

          </div>

          <NavLink to="/home" >
          <button class="btn-return">Return to Home</button>
          </NavLink>
        </div>
        <div className="about-image">
          <img src={imageAbout} alt="" />
        </div>
      </div>
    </>
  );
}
