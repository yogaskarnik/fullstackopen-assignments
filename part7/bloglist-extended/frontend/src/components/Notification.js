import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  return <div className="nitification-info">{notification.message}</div>;
};

export default Notification;
