import React, { useState, useEffect } from "react";
import "./DraggableList.css";

const DraggableList = ({ items, children, onListChange, provider }) => {
  // console.log("name:", provider, "items:", items, "children:", children);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [list, setList] = useState(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  const dragStartHandler = (event, index) => {
    setDraggingIndex(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", "");
  };

  const dragOverHandler = (event, index) => {
    event.preventDefault();
    if (draggingIndex === null) return;
    if (draggingIndex === index) return;

    let newList = [...list];
    newList.splice(index, 0, newList.splice(draggingIndex, 1)[0]);
    setDraggingIndex(index);
    setList(newList);
  };

  const dragEndHandler = () => {
    setDraggingIndex(null);
    // Call the onListChange callback with the new order of items
    if (onListChange) {
      onListChange(list, items);
    }
  };

  return (
    <div className="dragable-container">
      {list.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(event) => dragStartHandler(event, index)}
          onDragOver={(event) => dragOverHandler(event, index)}
          onDragEnd={dragEndHandler}
          className={`dragable-item ${
            index === draggingIndex ? "draging" : ""
          } ${provider}`}
        >
          {children ? children(item, index) : item}
        </div>
      ))}
    </div>
  );
};

export default DraggableList;
