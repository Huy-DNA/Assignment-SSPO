import React from 'react';
import ReportGrid from '../../components/ReportGrid/ReportGrid';

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        XEM BÁO CÁO
      </h1>
      <div>
        <ReportGrid />
      </div>
    </div>
  );
}
