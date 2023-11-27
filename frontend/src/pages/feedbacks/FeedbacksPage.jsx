import React, { useEffect, useState } from "react";
import { GET_FEEDBACKS_URL, UPLOAD_FEEDBACKS_URL } from "../../constants/url";
import { Button } from "@mui/material";
import extractAPIResponse from "../../utils/extractAPIResponse";
import { NotificationStatus } from "../../constants/notification";
import axios from "axios";
import useNotification from "../../hooks/useNotification";
import { useSelector } from "react-redux";
import { LoginStatus } from "../../constants/loginStatus";

export default function FeedbacksPage() {
  const notify = useNotification();
  const [feedbacks, setFeedbacks] = useState([]);
  const [typedFeedback, setTypedFeedback] = useState('');
  const onTypedFeedbackChange = (e) => setTypedFeedback(e.target.value);
  const onSubmitFeedback = () => {
    if (typedFeedback === '') {
      notify(NotificationStatus.ERR, 'A feedback must not be empty!');
    } else {
      setTypedFeedback('');
      axios.post(UPLOAD_FEEDBACKS_URL, [{
        content: typedFeedback,
      }])
        .then(({ data }) => extractAPIResponse(data))
        .then(() => notify(NotificationStatus.OK, ''))
        .catch((e) => notify(NotificationStatus.ERR, e.message));
    }
  } 
  const isManager = useSelector(state => state.loginStatus.value) === LoginStatus.MANAGER;

  useEffect(() => {
    axios.get(`${GET_FEEDBACKS_URL}`)
      .then(({ data }) => extractAPIResponse(data))
      .then(setFeedbacks)
      .catch((e) => notify(NotificationStatus.ERR, e.message))
  }, []);

  return (
    <div className="w-full h-full">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        ĐÁNH GIÁ
      </h1>
      <div className="flex flex-col">
        <div className="w-full h-full">

        </div>
        {
          !isManager &&
          <form className="m-5">
            <label htmlFor="feedback" className="my-5 font-bold text-lg">Give us a feedback</label>
            <div className="w-full lg:w-3/4 min-h-[3rem] flex flex-col items-end">
              <textarea value={typedFeedback} onChange={onTypedFeedbackChange} id="feedback" className="w-full border-blue-400 focus:border-blue-600 border-2 rounded-md p-5 m-2"/>
              <Button onClick={onSubmitFeedback} className="m-2">Send</Button>
            </div>
          </form>
        }
      </div>
    </div>
  )
}
