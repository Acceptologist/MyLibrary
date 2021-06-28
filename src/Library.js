//Library
import React, { useState, useEffect } from "react";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";

function Library() {
  const [listBook, setListBook] = useState([]);
  const [dataExsist, setDataExsist] = useState(false);
  useEffect(() => {
    BooksAPI.getAll().then((res) => {
      setListBook(res);
      setDataExsist(true);
    });
  }, []);

  function getListBook(shelf) {
    return listBook.filter((book) => {
      return book.shelf === shelf;
    });
  }
  function updateListBook(shelf, changedBook) {
    if (changedBook.shelf) {
      setListBook((prevState) =>
        prevState.filter((book) => {
          if (book.id === changedBook.id) {
            book.shelf = shelf;
            return book;
          }
          return book.id !== changedBook.id;
        })
      );
    } else {
      changedBook.shelf = shelf;
      setListBook((prevState) => [...prevState, changedBook]);
    }
  }
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <img src="logo3.png" className="logo" />
        </div>
        {dataExsist && (
          <div className="list-books-content">
            <Shelf
              shelf="Currently Reading"
              listBook={getListBook("currentlyReading")}
              onUpdate={updateListBook}
            />
            <Shelf
              shelf="Want To Read"
              listBook={getListBook("wantToRead")}
              onUpdate={updateListBook}
            />
            <Shelf
              shelf="Read"
              listBook={getListBook("read")}
              onUpdate={updateListBook}
            />
          </div>
        )}

        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    </div>
  );
}

export default Library;
