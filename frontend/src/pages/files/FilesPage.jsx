import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getClass } from 'file-icons-js';
import { UPLOAD_FILES_URL } from '../../constants/url';
import FileGrid from '../../components/FileGrid/FileGrid';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { NotificationStatus } from '../../constants/notification';
import useNotification from '../../hooks/useNotification';
import encodeUploadedFileToBase64 from '../../utils/encodeUploadedFileToBase64';

/**
 *
 */
function FilesPage() {
  const notify = useNotification();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFilesChange = async (e) => {
    setUploadedFiles([...uploadedFiles, ...e.target.files]);

    e.target.value = null;
  };

  const onSubmitFiles = async () => {
    const uploadInfos = await Promise.all(
      uploadedFiles.map(
        (file) => encodeUploadedFileToBase64(file)
          .then((content) => ({
            id: uuidv4(), name: file.name, content, uploadedAt: new Date(Date.now()),
          })),
      ),
    );
    try {
      await Promise.all(
        uploadInfos.map(
          (fileInfo) => axios.post(UPLOAD_FILES_URL, [fileInfo])
            .then((({ data }) => extractAPIResponse(data))),
        ),
      );
      setUploadedFiles([]);
      setFiles((oldFiles) => [...uploadInfos, ...oldFiles]);
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    }
  };
  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        QUẢN LÍ TÀI LIỆU
      </h1>
      <label htmlFor="fileUpload">
        <div className="rounded-md border-gray-600 border-dashed border-2 bg-gray-200 flex flex-col p-20 m-10 hover:cursor-pointer">
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-5xl" />
          <h3 className="text-center m-5">Tải lên file của bạn ở đây</h3>
        </div>
      </label>
      {
        uploadedFiles.length > 0
        && (
        <div className="rounded-md flex flex-col p-5 m-10 bg-gray-100">
          <button
            onClick={onSubmitFiles}
            className="rounded-lg bg-gray-200 border-2 border-slate-300 w-20 h-10 self-end"
          >
            Upload
          </button>

          <div className="m-5">
            {
              uploadedFiles.map((file, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="bg-gray-200 border-2 rounded-lg p-2 m-2 flex flex-row justify-between">
                  <span>
                    <span className={`${getClass(file.name)}`} />
                    {' '}
                    &nbsp;
                    {' '}
                    {file.name}
                  </span>
                  <span
                    className="self-end text-red-500 hover:cursor-pointer"
                    onClick={() => setUploadedFiles([
                      ...uploadedFiles.slice(0, index),
                      ...uploadedFiles.slice(index + 1),
                    ])}
                  >
                    <CloseIcon />
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        )
      }
      <input type="file" multiple id="fileUpload" className="hidden" onChange={handleFilesChange} />

      <FileGrid files={files} setFiles={setFiles} />
    </div>
  );
}

export default FilesPage;
