import React from "react";
import '../styles/logoSkills.css'

const LogoSkillsMecha = () =>{

    return(
        <>
            <div className="ContainerSkills">
                <div className="logoContainer">
                    <img style={{width: '100px'}} id="solid" title="SolidWorks" src="https://www.solidworks.com/sites/default/files/2018-02/SWlogo33.svg" alt="SolidWorks"/>
                </div>
                <div className="logoContainer">
                    <img title="LabView" src="https://ni.scene7.com/is/image/ni/LabVIEW?$ni-icon-pm$" alt="LabView" />
                    <span>LabView</span>
                </div>
                <div className="logoContainer">
                    <img style={{width: '100px'}} src="https://www.labcenter.com/images/proteus-logo-with-text.png" alt="Proteus Logo"></img>
                </div>
                <div className="logoContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 25" fill="none" data-inject-url="https://cdn.arduino.cc/header-footer/prod/assets/headerLogo-arduino.svg">
                        <title>Arduino</title>
                        <path fillRule="evenodd" clipRule="evenodd" d="M51.25 12.5C51.25 5.60219 45.5773 0 38.6242 0C37.984 0 37.3261 0.0364964 36.6859 0.145985C31.2799 0.930657 27.6522 4.92701 25.625 7.9927C23.5978 4.92701 19.9701 0.930657 14.5641 0.145985C13.9239 0.0547445 13.266 0 12.6258 0C5.65493 0 0 5.60219 0 12.5C0 19.3978 5.67271 25 12.6258 25C13.266 25 13.9239 24.9635 14.5819 24.854C19.9879 24.0511 23.6155 20.0547 25.6428 16.9891C27.67 20.0547 31.2977 24.0511 36.7037 24.854C37.3439 24.9453 38.0018 25 38.6598 25C45.5773 25 51.25 19.3978 51.25 12.5ZM13.9416 20.4744C13.4971 20.5474 13.0525 20.5657 12.6079 20.5657C8.01996 20.5657 4.30336 16.9343 4.30336 12.5C4.30336 8.04744 8.03774 4.4343 12.6257 4.4343C13.0703 4.4343 13.5148 4.4708 13.9594 4.52554C19.0631 5.27372 22.1751 10.4379 23.242 12.5C22.1573 14.5803 19.0275 19.7263 13.9416 20.4744ZM37.2905 4.52554C32.1868 5.27372 29.057 10.4379 28.0079 12.5C29.057 14.562 32.1868 19.7263 37.2905 20.4744C37.735 20.5292 38.1796 20.5657 38.6242 20.5657C43.1944 20.5657 46.9287 16.9525 46.9287 12.5C46.9287 8.06569 43.2121 4.4343 38.6242 4.4343C38.1796 4.4343 37.735 4.4708 37.2905 4.52554ZM9.06449 11.161H16.7004V13.5642H9.06449V11.161ZM42.1479 13.5817H39.5728V16.1077H37.1049V13.5817H34.5298V11.161H37.1049V8.63499H39.5728V11.161H42.1479V13.5817Z" fill="currentColor"></path>
                    </svg>
                    <span>Arduino</span>
                </div>
                <div className="logoContainer">
                    <img title="MATLAB" src="https://s3.amazonaws.com/ki.brand/logos/30052/toaster/membrane-only.png" alt="MATLAB" />
                    <span className="MATLAB">MATLAB</span>
                </div>
                {/* <img src="https://fpgasoftware.intel.com/static/v2/img/download/dl-software-logo-quartus.png" alt="" /> */}
            </div>
        </>
    )
}

export default LogoSkillsMecha;