import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../styles/home.css';
import LogoSkillsFront from '../components/LogoSkillsFront';
import LogoSkillsMecha from '../components/LogoSkillsMecha';
import LogoSkillsGene from '../components/LogoSkillsGene';

const Home = () => {
  return (
    <div className="viewUser" style={{color:"white"}}>
        <div className="containerImg">
          <img src="https://en.gravatar.com/userimage/202274366/34a3b24ccb55cf2f1cfa1ee3298e1476.jpg?size=200" alt="hector salazar" />
        </div>
        <div className="personalInformation">
          <div className="backgroundForText">
            <h1 className="Name" aria-label="nombre: ">
              Hector Miguel Salazar Doroteo
            </h1>
          </div>
          <div className="whoiam">
            <h4 aria-label="Welcome to my page">Welcome to my webpage</h4>
            <h4 aria-label="second line">I'm a Software Developer</h4>
          </div>
        </div>
        <div className="Three">
        </div>
        <div className="descriptionAboutMe">
          <h3 className="wordProfile">Profile</h3>
          <p className="textForDescription" style={{textAlign: 'justify'}}>
            I am a Software Developer and currently studying the tenth quarter of Mechatronics engineering from Mexico with a passion 
            for building digital and physical services/stuff. I always find the way to solving real-life 
            problems with code and also my hands. I want colaborate with teams apassionated to created innovative products.
            <br/>
            I am improving day by day because i've never stopped learning.
          </p>
        </div>
        <div className="descriptionAboutMe">
          <h3 className="wordWork">Work Experience</h3>
          <ul className="textForDescription workDescription">
            <li><h4>2019 - PRESENT</h4>Management of a seafood restaurant </li>
            <p style={{paddingTop: '10px'}}>
              I manage the part of the merchandise as well as the services generated by the restaurant, 
              I was working on its brand and website until i finished it.
            </p>
          </ul>
        </div>
        <div className="descriptionAboutMe">
          <h3 className="Skills">Skills</h3>
          <div className="textForDescription">
            <h4>Me like FrontEnd Developer</h4>
            <LogoSkillsFront/>
            <h4>Me like Mechatronic Engenieer</h4>
            <LogoSkillsMecha/>
            <h4>General Skills</h4>
            <LogoSkillsGene/>
          </div>
        </div>
        <motion.button
          className="linkToWorks"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
        <Link to="/works">My Works</Link>
        </motion.button>
        {/* <div className="descriptionAboutMe">
          <h3 className="Hobbies">Hobbies</h3>
          <ul className="textForDescription">
            <li>I love listen to music while I'm working on pesonal proyects</li>
            <li>In my free time I like play some games</li>
            <li>I love go out to know new places</li>
          </ul>
        </div>
        <div className="FinalPAge">
          Hi
        </div> */}
    </div>
  );
};

export default Home;