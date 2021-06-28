import React from "react";
import Books from "./Books";
function Shelf(props) {
  const { shelf, listBook, onUpdate } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
		<Books listBook={listBook} onUpdate={onUpdate}/>        
      </div>
    </div>
  );
}

export default Shelf;
