import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NotificationStatus } from '../../constants/notification';

/**
 *
 * @param root0
 * @param root0.status
 * @param root0.message
 * @param root0.onClose
 */
export default function NotificationBox({ status, message, onClose }) {
  return (
    <div className={
      `${status === NotificationStatus.OK ? 'bg-green-200 border-green-300 text-green-500 '
        : status === NotificationStatus.ERR ? 'bg-red-200 border-red-300 text-red-500 '
          : status === NotificationStatus.WAITING ? 'bg-blue-200 border-blue-300 text-blue-300 '
            : ' '} `
      + 'rounded-md border-2 w-[90vw] sm:w-[33vw] fixed right-5 top-5 p-2 z-50'
    }
    >
      <button onClick={onClose} className="absolute right-2"><FontAwesomeIcon icon={faClose} /></button>
      <p className="font-bold">
        {
          status === NotificationStatus.OK ? 'Successful'
            : status === NotificationStatus.ERR ? 'Error'
              : status === NotificationStatus.WAITING ? 'Processing'
                : ' '
        }
      </p>
      <p>{ message }</p>
    </div>
  );
}
