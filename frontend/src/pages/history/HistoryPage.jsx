import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PrinterJobGrid from "../../components/PrinterJobGrid/PrinterJobGrid";
import TransactionGrid from "../../components/TransactionGrid/TransactionGrid";

export default function HistoryPage() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  }

  return (
    <div>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Printer Jobs"/>
        <Tab label="Transactions"/>
      </Tabs>
      <div hidden={tab !== 0}>
        <PrinterJobGrid />
      </div>
      <div hidden={tab !== 1}>
        <TransactionGrid />
      </div>
    </div>
  )
}