import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import FileGrid from '../../components/FileGrid/FileGrid';

function FilesPage() {
  return (
    <div>
      <div className="rounded-md border-gray-600 border-2 bg-gray-200 flex flex-col p-20 m-10">
        <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-5xl"/>
        <h3 className="text-center m-5">Tải lên file của bạn ở đây</h3>
      </div>
      <FileGrid />
    </div>
  );
}

export default FilesPage;
