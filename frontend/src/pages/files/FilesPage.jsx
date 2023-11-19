import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import FileGrid from '../../components/FileGrid/FileGrid';
import axios from 'axios';
import { UPLOAD_FILES_URL } from '../../constants/url';

function FilesPage() {
  const [files, setFiles] = useState([]);
  const handleFilesChange = (e) => {
    setFiles([...files, ...e.target.files]);;
  };
  const onSubmitFiles = async () => {
    await Promise.all(files.map((file) => file.text().then((content) => ({ name: file.name, content: content }))
                                                     .then((fileInfo) => axios.post(UPLOAD_FILES_URL, [fileInfo]))));
    setFiles([]);
  }

  return (
    <div>
      <label htmlFor="fileUpload">
        <div className="rounded-md border-gray-600 border-dashed border-2 bg-gray-200 flex flex-col p-20 m-10 hover:cursor-pointer">
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-5xl"/>
          <h3 className="text-center m-5">Tải lên file của bạn ở đây</h3>
        </div>
      </label>
      { files.length > 0 && <button onClick={onSubmitFiles}>Upload files</button> }
      <input type="file" multiple id="fileUpload" className="hidden" onChange={handleFilesChange}/>
      
      <FileGrid />
    </div>
  );
}

export default FilesPage;
