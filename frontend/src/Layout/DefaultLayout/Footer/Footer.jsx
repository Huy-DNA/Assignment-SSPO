import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import
{
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/images/images';
import '../../../../styles.css';

/**
 *
 */
function Footer() {
  return (
    <div className="flex lg:flex-row flex-col justify-between p-5 bg-blue-950">
      <div className="mt-2">
        <div className="flex flex-row m-4 gap-4">
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
        <div className="flex items-center font-medium text-white hover:cursor-pointer m-2">
          <img src={images.logo} alt="logo-web" className="w-24 h-24 m-2" />
          <span className="lg:text-2xl text-xl font-medium ml-4">BK PRINTERS SERVICES</span>
        </div>
      </div>
      <div className="mt-8 pr-24">
        <div className="flex items-center text-white text-sm hover:cursor-pointer">
          <FontAwesomeIcon icon={faPhone} className="w-5 h-5 m-2 hover:cursor-pointer scale-125" />
          <span className="scale-125 pl-4">0123456789</span>
        </div>
        <div className="flex items-center text-white text-sm hover:cursor-pointer">
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 m-2 mr-6 hover:cursor-pointer scale-125" />
          <span className="scale-125 pl-4">bkprinterservice@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
