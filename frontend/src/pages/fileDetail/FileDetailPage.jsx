import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GET_FILES_URL } from '../../constants/url';
import extractAPIResponse from '../../utils/extractAPIResponse';
import useNotification from '../../hooks/useNotification';
import { NotificationStatus } from '../../constants/notification';
import mime from 'node-mime';
import _ from 'lodash';
import formatDate from '../../utils/formatDate';
import { CircularProgress } from '@mui/material';

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
    <div className="min-h-screen">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        CHI TIẾT TÀI LIỆU
      </h1>
      <div className="h-full">
        <h1 className="font-semibold text-2xl my-2">
          { detail.name }
        </h1>
        <p>{ detail.uploadedAt && <span>Upload vào: { formatDate(new Date(detail.uploadedAt)) }</span> }</p>
        
        <div className="min-h-screen m-2">
          { 
            detail.content ?
              <iframe className="border-3 w-full h-screen sm:w-5/6 m-auto"
                src={`data:${mime.lookUpType(ext)};base64,${detail.content}`}
              /> :
              <div className="h-full flex items-center justify-center">
                <CircularProgress size="4rem" title="Loading"/>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
