import React, { useEffect, useState } from 'react';
import { GET_PRINTERS_URL } from '../../constants/url';
import images from '../../../assets/images/images';
import useNotification from '../../hooks/useNotification';
import { useParams } from 'react-router';
import axios from 'axios';
import { NotificationStatus } from '../../constants/notification';
import extractAPIResponse from '../../utils/extractAPIResponse';

export default function PrinterDetailPage() {
  const notify = useNotification();
  const { id } = useParams();
  const [ detail, setDetail ] = useState({
    brand: undefined,
    building: undefined,
    campus: undefined,
    code: undefined,
    description: undefined,
    enabled: undefined,
    id: undefined,
    name: undefined,
    room: undefined,
  });

  useEffect(() => {
    axios.get(`${GET_PRINTERS_URL}/info/${id}`)
      .then(({ data }) => extractAPIResponse(data))
      .then(setDetail)
      .catch((e) => notify(NotificationStatus.ERR, e.message))
  }, []);
  return (
    <div className="w-full h-full flex flex-row"> 
      <div className="w-full h-full lg:w-1/3 p-5">
        <img className="h-1/2" src={images.printer}/>
      </div>
      <div className="w-full lg:w-2/3 p-10">
        <h1 className="font-semibold text-2xl">
          Name: { detail.name === undefined ? <i className="font-light">Loading...</i> : detail.name }
        </h1>

        <div className="m-5">
          <p>Code: { detail.code === undefined ? <i className="font-light">Loading...</i> : detail.code } </p>
          <p>Id: { detail.id === undefined ? <i className="font-light">Loading...</i> : detail.id } </p>
          <p>Brand: { detail.brand === undefined ? <i className="font-light">Loading...</i> : detail.brand } </p>
          <p>Description: { detail.description === undefined ? <i className="font-light">Loading...</i> : detail.description } </p>
          <p>Campus: { detail.campus === undefined ? <i className="font-light">Loading...</i> : detail.campus } </p>
          <p>Building: { detail.building === undefined ? <i className="font-light">Loading...</i> : detail.building } </p>
          <p>Room: { detail.room === undefined ? <i className="font-light">Loading...</i> : detail.room } </p>
          <p>Enabled: { detail.enabled === undefined ? <i className="font-light">Loading...</i> : String(detail.enabled) } </p>
        </div>
      </div> 
    </div>
  )
}
