import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GET_FILES_URL } from '../../constants/url';
import extractAPIResponse from '../../utils/extractAPIResponse';
import useNotification from '../../hooks/useNotification';
import { NotificationStatus } from '../../constants/notification';
import mime from 'node-mime';
import _ from 'lodash';

export default function FileDetailPage() {
  const notify = useNotification();
  const { id } = useParams();
  const [ detail, setDetail ] = useState({
    name: undefined,
    content: undefined,
    uploadedAt: undefined,
  });
  const ext = detail?.name ? _.last(detail?.name?.split('.')) : undefined;

  useEffect(() => {
    axios.get(`${GET_FILES_URL}/info/${id}`)
      .then(({ data }) => extractAPIResponse(data))
      .then(({ name, content, uploadedAt }) => setDetail({
        name,
        content,
        uploadedAt
      }))
      .catch((e) => notify(NotificationStatus.ERR, e.message))
  }, []);
  return (
    <div className="w-full h-full">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        CHI TIẾT TÀI LIỆU
      </h1>
      <div className="w-full h-screen flex flex-row"> 
        <div className="w-full lg:w-1/3 p-5">
          <h1 className="font-semibold text-2xl">
            Name: { detail.name === undefined ? <i className="font-light">Loading...</i> : detail.name }
          </h1>

          <div className="m-5">
            <p>
              Uploaded at: { detail.uploadedAt === undefined ? <i className="font-light">Loading...</i> : detail.uploadedAt }
            </p>
          </div>
        </div>
        
        <div className="w-full h-full lg:w-2/3 p-5">
          { detail.content
            ? <iframe className="w-full h-full"
              src={`data:${mime.lookUpType(ext)};base64,${detail.content}`}
            />
            : <div className="w-full h-full p-10 text-white bg-gray-500 text-2xl">
              Loading file content...
            </div>
          }
        </div>
      </div>
    </div>
  )
}
