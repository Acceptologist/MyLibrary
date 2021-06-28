import React from "react";
import Select from "./Select";

function Books(props) {
  const {listBook, onUpdate} = props;
  const list={
  ids:[],
  shelfs:[]
 }
  if(props.list){
  list.ids=props.list.ids;
  list.shelfs=props.list.shelfs
  }
  let shelf="",bookIndex=-1;
  return (
          <ol className="books-grid">
          {listBook.map((book) => {
    		
            bookIndex=(list.ids.findIndex(id=>id===book.id));
    		if(book.shelf){
            shelf=book.shelf;
            }
    	   else if(bookIndex!==-1){
           shelf=list.shelfs[bookIndex];
            }else{
           shelf="none" 
            }
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                          book["imageLinks"]!==undefined? ("url(" + book["imageLinks"]["thumbnail"] + ")"):""
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                     <Select key={book.id} value={shelf} book={book} onUpdate={onUpdate}/>
                    </div>
                  </div>
                  <div className="book-title">{book["title"]}</div>
                  <div className="book-authors">
                    {book["authors"]&&book["authors"].join(" ,   ")}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
  );
}

export default Books;
