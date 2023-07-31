import React, { useState, useEffect } from "react";
import DraggableList from "../DraggableList/DraggableList";

import "./SheetView.css";

const SheetView = ({ sheet, data, onSheetReorder }) => {
  //   console.log("data in sheetView", data);
  const [columns, setColumns] = useState([]);
  const [localData, setLocalData] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const newColumns = Array.from({ length: data[0].length }, (_, i) =>
        String.fromCharCode(65 + i)
      );
      newColumns.push("SUM");
      setColumns(newColumns);
      setLocalData(data.map((row) => [...row, row.reduce((a, b) => a + b, 0)]));
    }
  }, [data]);

  if (!sheet) {
    return <div>No spreadsheet selected</div>;
  }

  const handleListChange = (newColumns, oldColumns) => {
    const oldIndexMap = newColumns.reduce((acc, column, index) => {
      acc[column] = index;
      return acc;
    }, {});
    const newLocalData = localData.map((row) => {
      let newRow = new Array(newColumns.length);
      row.forEach((value, index) => {
        newRow[oldIndexMap[columns[index]]] = value;
      });
      return newRow;
    });
    setLocalData(newLocalData);
    setColumns(newColumns);
    onSheetReorder(newLocalData);
  };
  return (
    <div className="sheet-view-container">
      <DraggableList
        items={columns}
        onListChange={handleListChange}
        provider="sheetView"
      />
      {localData.map((row, i) => (
        <div className="sheet-row" key={i}>
          {row.map((cell, j) => (
            <span className="sheet-cell" key={j}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SheetView;
