import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  return <div className="notification-info">{notification.message}</div>;
};

export default Notification;
