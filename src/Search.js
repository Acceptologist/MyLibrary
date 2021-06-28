import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResultMessage, setnoResultMessage] = useState("");
  const [listBook, setListBook] = useState([]);
  const [dataExsist, setDataExsist] = useState(false);
  const [listExsist, setlistExsist] = useState(false);
  const [list, setList] = useState({
    ids: [],
    shelfs: []
  });
  useEffect(() => {
    let newList = { ids: [], shelfs: [] };
    BooksAPI.getAll()
      .then((res) => {
        res.forEach((item) => {
          newList.ids.push(item["id"]);
          newList.shelfs.push(item["shelf"]);
        });
      })
      .then(() => setList(newList))
      .then(() => setlistExsist(true))
      .catch(() => {
        setlistExsist(false);
      });
  }, []);

  function handelOnChange(event) {
    new Promise((resolve, reject) => {
      const term = event.target.value;
      setSearchTerm(term);
      console.log(term);
      if (term.length > 0) {
        resolve(term);
      } else {
        throw "validationError";
      }
    })
      .then((term) => {
        setnoResultMessage("");
        return term;
      })
      .then((term) => {
        setDataExsist(false);
        return term;
      })
      .then((sTerm) => {
        return BooksAPI.search(sTerm, 20);
      })
      .then((res) => {
        console.log(res);
        if (res.error && res.error === "empty query") {
          setnoResultMessage("There is no results");
          throw "validationError";
        } else {
          console.log("|| True ||");
          setListBook(res);
          return res;
        }
      })
      .then((res) => {
        console.log(res);
        if (res.length) setDataExsist(true);
        else throw "validationError";
      })
      .catch(() => {
        setListBook([]);
      });
  }

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={handelOnChange}
              value={searchTerm}
            />
          </div>
        </div>

        {dataExsist && listExsist && searchTerm && (
          <div className="search-books-results">
            {searchTerm && <p>Number of Search results: {listBook.length}</p>}
            <Books listBook={listBook} list={list} onUpdate={() => {}} />
          </div>
        )}
        {!dataExsist && searchTerm && (
          <p className="no-result">{noResultMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Search;
