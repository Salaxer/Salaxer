import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import './home.css';

import { LogoSkillsFront, LogoSkillsMecha } from '../../components'
import { NewPage } from '../../Icons'
  
const Home = () => {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)"
    }
  };
  return (
      <div className="viewUser" style={{color:"white"}}>
        <Helmet>
          <title>Salaxer | About me</title>
        </Helmet>
          <div className="containerImg">
            <motion.svg tabIndex={0} aria-label='Hector Salazar Logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.99 485.99">
              <motion.g id="Layer_2" >
                  <motion.g id="Layer_1-2" >
                    <motion.circle cx="243" cy="243" r="243"/>
                    <motion.path className="cls-1"
                      variants={icon}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        default: { duration: 2, ease: "easeInOut" },
                        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                      }} d="M286.92,442.38A13.17,13.17,0,0,1,274,432l-40.07-179.2-71.77-.39-28,125a13.26,13.26,0,0,1-25.86.06L79.43,252l-31.52-.17a13.25,13.25,0,0,1-12.62-17.07c7-23.21,13.89-47,20.38-69.3a13.26,13.26,0,0,1,25.66.74L96.2,231l49.13.27L185.12,54A13.26,13.26,0,0,1,211,54l39.78,177.89,73.11.4,26.92-117.9a13.26,13.26,0,0,1,25.84-.05L404.14,232.7l33.88.18a13.28,13.28,0,0,1,12.77,16.75c-7,25.72-14,51.15-20.94,76.55a13.26,13.26,0,0,1-25.7-.52l-16.73-72-46.78-.25-40.8,178.68A13.19,13.19,0,0,1,286.92,442.38Z">
                    </motion.path>
                  </motion.g>
              </motion.g>
            </motion.svg>
          </div>
          <div className="personalInformation">
            <div className="backgroundForText">
              <h1 className="Name" tabIndex={0} aria-label="portfolio's name: Hector Miguel Salazar Doroteo">
                Hector Salazar
              </h1>
            </div>
            <div className="whoIam" tabIndex={0} aria-label='Principal Description: Welcome to my webpage, Im a Software Developer'>
              <h4>Welcome to my webpage</h4>
              <h4>I'm a Software Developer</h4>
            </div>
          </div>
          <div className="Three">
          </div>
          <div className="descriptionAboutMe">
            <h3 className="wordProfile" tabIndex={0}>Profile</h3>
            <p tabIndex={0} className="textForDescription" style={{textAlign: 'justify'}}>
              I am a Software Developer and Mechatronics engineering from Mexico with a passion for building digital and physical services/stuff. I always find the way to solving real-life problems with code. I want collaborate with teams passionate to created innovative products.
              <br/>
              I am improving day by day because I've never stopped learning.
            </p>
          </div>
          <div className="descriptionAboutMe">
            <h3 tabIndex={0}  className="wordWork">Work Experience</h3>
            <ul className="textForDescription workDescription">
              <li tabIndex={0}>
                <h4 >September 2022 - Current.</h4>
                <h4>
                  Support and FrontEnd Developer | TATA CONSULTANCY SERVICES
                  <a href="https://www.tcs.com/" target="_blank" rel="noopener noreferrer" style={{paddingLeft: "1rem"}}><NewPage height={19} width={19}/></a>
                </h4>
                <p style={{paddingTop: '10px'}}>
                Development and automation of various applications for internal use, significantly enhancing time efficiency for daily tasks. These applications support activities such as monitoring, data quality, and data preservation
                  {/* <br/><code aria-label="tecnologías usadas">Technologies:</codes>
                  <br/><code>FrontEnd: Angular, TypeScript, HTML5, CSS3, MQTT</code>
                  <br/><code>BackEnd: hidden </code>
                  <br/><code>Database: hidden </code> */}
                </p>
              </li>
              <li tabIndex={0}>
                <h4 >January 2022 - April 2022.</h4>
                <h4>
                  Professional practices | CIRCUTEC
                  <a href="https://www.circuitec.mx/" target="_blank" rel="noopener noreferrer" style={{paddingLeft: "1rem"}}><NewPage height={19} width={19}/></a>
                </h4>
                <p style={{paddingTop: '10px'}}>
                  Develop a front-end web interface with UI/UX design (User Interface and User experience) for the generation of a SPA (Single Page Application) which manages different types of users, monitors different IoT (Internet of Things) devices and same time to be able to control them through various configurations using
                  of modern technologies.
                  {/* <br/><code aria-label="tecnologías usadas">Technologies:</code>
                  <br/><code>FrontEnd: Angular, TypeScript, HTML5, CSS3, MQTT</code>
                  <br/><code>BackEnd: hidden </code>
                  <br/><code>Database: hidden </code> */}
                </p>
              </li>
              <li tabIndex={0}>
                <h4>April 2019 - December 2021.</h4>
                <h4>
                  Restaurant brand | Doña Martha
                  <a href="https://donamartha.com.mx/" target="_blank" rel="noopener noreferrer" style={{paddingLeft: "1rem"}}><NewPage height={19} width={19}/></a>
                </h4>
                <p style={{paddingTop: '10px'}}>
                Create a brand for the restaurant, design and develop a web page where consumers can see the catalog of products that the restaurant offers and also show the existing offers
                  {/* <br/><code aria-label="tecnologías usadas">Technologies:</code>
                  <br/><code>FrontEnd: NEXT.JS, TypeScript, HTML5, CSS3</code>
                  <br/><code>BackEnd: /api/ NEXT.JS, Node.Js </code>
                  <br/><code>Database: Firebase </code> */}
                </p>
              </li>
            </ul>
          </div>
          <div className="descriptionAboutMe">
            <h3 className="Skills" tabIndex={0} aria-label="My Skills">Skills</h3>
            <div tabIndex={0} className="textForDescription">
              <h4>Software Developer</h4>
              <LogoSkillsFront/>
              <h4 aria-label='now my engineering skills in mechatronics.'>Mechatronic Engenieer</h4>
              <LogoSkillsMecha/>
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