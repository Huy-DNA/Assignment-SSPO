import React from "react";
import { NotificationStatus } from "../../constants/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function NotificationBox({ status, message, onClose }) {
  return (
    <div className={
      `${status === NotificationStatus.OK ? "bg-green-200 border-green-300 text-green-500" : "bg-red-200 border-red-300 text-red-500"} ` +
      "rounded-md border-2 w-[90vw] sm:w-[33vw] fixed right-5 top-5 p-2"
    }>
      <button onClick={onClose} className="absolute right-2"><FontAwesomeIcon icon={faClose}/></button>
      <p className="font-bold">{ status === NotificationStatus.OK ? "Successful" : "Error" }</p>
      <p>{ message }</p>
    </div>
  )
}
