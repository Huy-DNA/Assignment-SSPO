import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import PrinterJobGrid from '../../components/PrinterJobGrid/PrinterJobGrid';
import TransactionGrid from '../../components/TransactionGrid/TransactionGrid';

export default function HistoryPage() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  }

  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        XEM LỊCH SỬ IN & GIAO DỊCH
      </h1>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Printer Jobs"/>
        <Tab label="Transactions"/>
      </Tabs>
      {
        tab === 1 ?
          <div>
            <PrinterJobGrid />
          </div> :
          <div>
            <TransactionGrid />
          </div>
      }
    </div>
  )
}