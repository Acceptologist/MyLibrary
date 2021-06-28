import React, { useState } from "react";
import * as BooksAPI from "./BooksAPI";


function Select(props) {
  const {value,book,onUpdate}=props;
  const [optionsState, setOptionsState] = useState(value);

  function handelChange(event){
    const value=event.target.value;
    BooksAPI.update(book,value).then((res) => {
      setOptionsState(value);
      onUpdate(value,book);
    });
    
  }
  
  return (
    <select onChange={handelChange} value={optionsState}>
      <option value="move" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  );
}
export default Select;
