import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import
{
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss';
import images from '../../../../assets/images/images';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <div className={cx('logo-media')}>
          <img
            src={images.facebooklogo}
            alt="facebook logo"
            className={cx('logo-media-icon')}
          />
          <img
            src={images.instalogo}
            alt="instagram logo"
            className={cx('logo-media-icon')}
          />
          <img
            src={images.twitterlogo}
            alt="twitter logo"
            className={cx('logo-media-icon')}
          />
        </div>
        <div className={cx('logo-website')}>
          <img src={images.logo} alt="logo-web" className={cx('logo-website-icon')} />
          BK PRINTERS SERVICES
        </div>
      </div>
      <div className={cx('contact')}>
        <div className={cx('contact-phone')}>
          <FontAwesomeIcon icon={faPhone} className={cx('logo-contact')} />
          0123456789
        </div>
        <div className={cx('contact-email')}>
          <FontAwesomeIcon icon={faEnvelope} className={cx('logo-contact')} />
          bkprinterservice@gmail.com
        </div>
      </div>
    </div>
  );
}

export default Footer;
