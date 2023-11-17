import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import
{
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/images/images';
import '../../../../styles.css';

function Footer() {
  return (
    <div className="flex flex-row justify-between p-5 bg-blue-950">
      <div className="mt-2.5">
        <div className="flex flex-row m-5 gap-5">
          <img
            src={images.facebooklogo}
            alt="facebook logo"
            className="w-8 h-8 mr-0 m-2 hover:cursor-pointer"
          />
          <img
            src={images.instalogo}
            alt="instagram logo"
            className="w-8 h-8 mr-0 m-2 hover:cursor-pointer"
          />
          <img
            src={images.twitterlogo}
            alt="twitter logo"
            className="w-8 h-8 mr-0 m-2 hover:cursor-pointer"
          />
        </div>
        <div className="flex items-center font-medium text-white hover:cursor-pointer m-5">
          <img src={images.logo} alt="logo-web" className="w-32 h-32 m-2" />
          <span>BK PRINTERS SERVICES</span>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center text-white text-sm hover:cursor-pointer">
          <FontAwesomeIcon icon={faPhone} className="w-5 h-5 m-2 hover:cursor-pointer" />
          <span>0123456789</span>
        </div>
        <div className="flex items-center text-white text-sm hover:cursor-pointer">
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 m-2 hover:cursor-pointer" />
          <span>bkprinterservice@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
