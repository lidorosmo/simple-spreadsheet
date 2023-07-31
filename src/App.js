import React, { useEffect, useState } from "react";
import SheetView from "./components/SheetView/SheetView";
import SheetList from "./components/SheetList/SheetList";

function App() {
  const [data, setData] = useState({});
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetch(
      "https://clinch-public-documents.s3.amazonaws.com/clinch-recruitment/spreadsheet.json"
    )
      .then((response) => response.text()) // The reponse is text
      .then((responseText) => {
        const fetchedData = JSON.parse(JSON.parse(responseText));
        setData(fetchedData);
        // setData(
        //   Object.fromEntries(
        //     Object.entries(fetchedData).map(([sheetName, sheetData]) => [
        //       sheetName,
        //       sheetData.map((row) => [...row, row.reduce((a, b) => a + b, 0)]),
        //     ])
        //   )
        // );
        setSheets(Object.keys(fetchedData));
        // console.log("fetched:", fetchedData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSheetSelection = (sheet) => {
    setSelectedSheet(sheet);
  };
  const handleSheetListChange = (newList) => {
    setSheets(newList);
  };
  const handleSheetViewChange = (newSheetData) => {
    const oldData = data;
    // console.log(newSheetData);
    oldData[selectedSheet] = newSheetData;
    console.log("data:", data, "\n newdata:", oldData);
  };

  return (
    <div>
      <SheetList
        sheets={sheets}
        onSelectSheet={handleSheetSelection}
        onListChange={handleSheetListChange}
      />
      <SheetView
        sheet={selectedSheet}
        data={data[selectedSheet] ?? []}
        onSheetReorder={handleSheetViewChange}
      />
    </div>
  );
}

export default App;
