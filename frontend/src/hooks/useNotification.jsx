import { useContext } from "react";
import { NotificationContext } from "../layout/DefaultLayout/DefaultLayout";

export default function useNotification() {
  const setNotification = useContext(NotificationContext);
  return (status, message) => {
    setNotification({
      status,
      message,
      visible: true,
    });
    setTimeout(() => setNotification({
      status,
      message,
      visible: false,
    }), 5000);
  };
}