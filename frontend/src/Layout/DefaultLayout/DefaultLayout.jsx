import React, { createContext, useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import '../../../styles.css';
import NotificationBox from '../../components/Notification/NotificationBox';

export const NotificationContext = createContext(() => {});

function DefaultLayout({ children }) {
  const [notification, setNotification] = useState({
    status: undefined,
    message: undefined,
    visible: false,
  });
  const onClose = () => {
    setNotification({
      status: undefined,
      message: undefined,
      visible: false,
    });
  }
  return (
    <NotificationContext.Provider value={setNotification}>
      { notification.visible &&
        <NotificationBox
          status={notification.status}
          message={notification.message}
          onClose={onClose}
        />
      }
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </NotificationContext.Provider>
  );
}

export default DefaultLayout;
