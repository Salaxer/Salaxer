import React from 'react';
import '../styles/contact.css'
import SocilaNetworks from '../components/SocilaNetworks'

const Contact = () => {
  return (
    <div className="viewContact" style={{color: 'white'}}>
      <div className="followMe">
        <SocilaNetworks/>
      </div>
      <div>
        {/* <FormToLinkMyEmail/> */}
      </div>
    </div>
  );
};

export default Contact;