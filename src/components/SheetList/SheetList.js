import React, { useEffect, useState } from "react";
import DraggableList from "../DraggableList/DraggableList";
import "./SheetList.css";

const SheetList = ({ sheets, onSelectSheet, onListChange }) => {
  const [selectedSheet, setSelectedSheet] = useState("");
  // const [sheetList, setSheetList] = useState([]);

  // useEffect(() => {
  //   setSheetList(sheets);
  // }, [sheets]);

  const handleClick = (sheet) => {
    onSelectSheet(sheet);
    setSelectedSheet(sheet);
  };

  // const handleListChange = (newList) => {
  //   setSheetList(newList);
  // };

  return (
    <div className="sheet-list-container">
      <DraggableList
        items={sheets}
        onListChange={onListChange}
        provider="sheetList"
      >
        {(sheet) => (
          <div
            className={`sheet-list-item ${
              selectedSheet === sheet ? "selected" : ""
            }`}
            onClick={() => handleClick(sheet)}
          >
            {sheet}
          </div>
        )}
      </DraggableList>
    </div>
  );
};

export default SheetList;
