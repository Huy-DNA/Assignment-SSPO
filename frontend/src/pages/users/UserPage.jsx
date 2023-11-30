import React, { useState } from 'react';
import UserGrid from '../../components/UserGrid/UserGrid';
import axios from 'axios';
import { AWARD_PAPER_URL } from '../../constants/url';
import extractAPIResponse from '../../utils/extractAPIResponse';
import useNotification from '../../hooks/useNotification';
import { NotificationStatus } from '../../constants/notification';

export default function UsersPage() {
  const [awardedPaperNo, setAwardedPaperNo] = useState(0);
  const notify = useNotification();
  const handleSubmit = async () => {
    notify(NotificationStatus.WAITING);
    try {
      await axios.post(AWARD_PAPER_URL, { paperNo: awardedPaperNo })
        .then(({ data }) => extractAPIResponse(data));
      setAwardedPaperNo(0);
      notify(NotificationStatus.OK);
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    }
  };

  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        QUẢN LÍ TÀI KHOẢN
      </h1>
      <UserGrid />
      <div className="bg-white rounded-lg mt-5 p-5"> 
        <h2 className="text-blue-900 font-bold text-xl">
          Tặng giấy
        </h2>
        <p className="font-light">Tặng một lượng giấy miễn phí cho tất cả sinh viên!</p>
        <div className="flex flex-row justify-center gap-5 p-5">
          <input type="number" min={0} className="border-2 border-gray-500 active:border-gray-500 text-left p-1 px-5 rounded-lg bg-gray-100" value={awardedPaperNo} onChange={(e) => setAwardedPaperNo(e.target.value)} />
          <button onClick={handleSubmit} className="text-white bg-blue-500 active:bg-blue-700 font-bold p-1 rounded-lg">Grant</button>
        </div>
      </div>
    </div>
  );
}