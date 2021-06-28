import React,{useState,useEffect} from 'react'
import * as BooksAPI from "./BooksAPI";
import Books from "./Books"


function Search(props){
const [searchTerm,setSearchTerm]=useState("");
const [listBook,setListBook]=useState([]);
const [dataExsist, setDataExsist] = useState(false);
const [listExsist, setlistExsist] = useState(false);
const [list, setList] = useState({
ids:[],
shelfs:[]
});

 useEffect(() => {
      let newList={ids:[],shelfs:[]};
      BooksAPI.getAll().then((res) => {
     res.forEach((item)=>{  newList.ids.push(item["id"]);   
                          newList.shelfs.push(item["shelf"]);}
                ); }).then(()=>setList(newList))
        			 .then(()=>setlistExsist(true))
                     .catch(()=>{setlistExsist(false);});
 },[]);
  
  function handelOnChange(event){
  new Promise((resolve, reject) => {
    setDataExsist(false);
    const term=event.target.value;
    setSearchTerm(term);
    if(term.length>0){
    resolve(term);
    }else {
    reject();
    }
  }).then((sTerm)=>{    
    BooksAPI.search(sTerm,20).then((res) =>{
    if(res["error"]&&res["error"]==="empty query"){
	 setListBook([]);
    }else{ 
      setListBook(res)
            setDataExsist(true);
    }
    })
    .then(()=>{
      if(listBook.length)
      setDataExsist(true);
    }).catch(()=>{setListBook([])});
  }).catch(()=>{setListBook([])});
  }
  
  return  (  
      		<div className="app">
      		<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" href="/">Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={handelOnChange} value={searchTerm}/>
              </div>
            </div>

{dataExsist&&listExsist&&listBook&&listBook["error"]!=="empty query"&&
            (<div className="search-books-results">
              <Books listBook={listBook} list={list} onUpdate={()=>{}}/>
            </div> 
)}
          </div>
 			</div>
       )
}

export default Search;




/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */