const Notification = ({ message, type }) => {
  if (!message) return null;
  const calculateClass = type === "error" ? "error" : "sucess";

  return <div className={calculateClass}>{message}</div>;
};
export default Notification;
