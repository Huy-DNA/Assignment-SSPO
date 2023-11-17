import React from 'react';
import DisplayPrinter from '../../components/PrinterGrid/PrinterGrid';

function PrintersPage() {
  return (
    <div>
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        QUẢN LÍ MÁY IN
      </h1>
      <div>
        <DisplayPrinter />
      </div>
    </div>
  );
}

export default PrintersPage;
