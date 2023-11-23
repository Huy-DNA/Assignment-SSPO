import React from "react";
import { useParams } from "react-router";
import useNotification from "../../hooks/useNotification";
import { useEffect, useState } from "react";
import extractAPIResponse from "../../utils/extractAPIResponse";
import axios from "axios";
import { GET_REPORTS_URL } from "../../constants/url";

export default function ReportDetailPage() {
  const notify = useNotification();
  const { id } = useParams();
  const [ detail, setDetail ] = useState({
    week: undefined,
    year: undefined,
    printer_jobs: undefined,
    transactions: undefined,
  });

  useEffect(() => {
    axios.get(`${GET_REPORTS_URL}/info/${id}`)
      .then(({ data }) => extractAPIResponse(data))
      .then(setDetail)
      .catch((e) => notify(NotificationStatus.ERR, e.message))
  }, []);

  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        CHI TIẾT BÁO CÁO
      </h1>
      { detail.week !== undefined && <p>Tuần: { detail.week }</p> }
      { detail.year !== undefined && <p>Năm: { detail.year }</p> }
    </div>
  )
}
