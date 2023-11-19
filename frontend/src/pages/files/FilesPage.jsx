import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import FileGrid from '../../components/FileGrid/FileGrid';
import axios from 'axios';
import { UPLOAD_FILES_URL } from '../../constants/url';
import { v4 as uuidv4 } from 'uuid';

function FilesPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFilesChange = (e) => {
    setUploadedFiles([...uploadedFiles, ...e.target.files]);;
  };
  const onSubmitFiles = async () => {
    const uploadInfos = await Promise.all(uploadedFiles.map((file) => file.text().then((content) => ({ id: uuidv4(), name: file.name, content: content, uploadedAt: new Date(Date.now()), }))));
    await Promise.all(uploadInfos.map((fileInfo) => axios.post(UPLOAD_FILES_URL, [fileInfo])));
    setUploadedFiles([]);
    setFiles([...uploadInfos, ...files]);
  }

  return (
    <div>
      <label htmlFor="fileUpload">
        <div className="rounded-md border-gray-600 border-dashed border-2 bg-gray-200 flex flex-col p-20 m-10 hover:cursor-pointer">
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-5xl"/>
          <h3 className="text-center m-5">Tải lên file của bạn ở đây</h3>
        </div>
      </label>
      { 
        uploadedFiles.length > 0 &&
        <div className="rounded-md flex flex-col p-5 m-10">
          <button
            onClick={onSubmitFiles}
            className="rounded-lg bg-gray-100 border-2 border-b-slate-300 w-20 h-10 self-end"
          >
            Upload
          </button>
        </div>
      }
      <input type="file" multiple id="fileUpload" className="hidden" onChange={handleFilesChange}/>
      
      <FileGrid files={files} setFiles={setFiles} />
    </div>
  );
}

export default FilesPage;
