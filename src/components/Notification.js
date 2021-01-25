import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return notification ? (
    <div
      className={`${
        notification.type === "success" ? "bg-green-100" : "bg-red-100"
      } fixed bottom-2 inset-x-2 sm:right-initial  py-4 px-6 rounded text-black`}
    >
      {notification.message}
    </div>
  ) : null;
};

export default Notification;
