import React, {useState, useEffect} from "react" 
import Book from './Cards/BookCard' 
import logo from '../images/kids_book.svg' 
import { GetRecent } from "../Service/BookService" 

//res: https://github.com/harshsomya004/myWebpage/tree/main/

function Home(){
    const [error, setError] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [BookList, setBookList] = useState([]) 
    const [showBooks, setShowBooks] = useState(false) 

    const onSubmit = (e) => {
        e.preventDefault() 
        GetRecent()
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setBookList(results) 
                setError(false)
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(true)
            }
        )
    }

    useEffect(() => {
        //api call
        fetch("/Book/recent")
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setBookList(results) 
                setInterval(() =>{
                    setShowBooks(true)
                }, 5000)
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(true)
                setError(error)
            }
        )
    }, [])

    if(error){
        return (<div className="container">
                <button className='input_submit' onClick={(e) => onSubmit(e)}> ReFRESH </button>
                </div>) 
    }
    else if(!isLoaded){
        return (
            <div>
                <img width={200} height={200} src={logo} alt="fairy girl for waiting"/>
                <br></br>
                LOADING...
            </div>
        ) 
    }
    else{
        return(
            (showBooks === true ?
                <div key={0} style={{backgroundColor: '#000080', height: "auto", overflow: "auto", marginRight: "-20px", marginTop: "-30px", paddingRight: "20px"}}>
                    <h1 key={1} style={{color: 'white', fontFamily: "Palatino"}}>Newest Books In The Club</h1>
                
                    <div key={2} className="container2" >
                        {BookList.map( _Book => (
                            <Book key={_Book.isbn} title={_Book.title} year={_Book.year} author={_Book.author} publisher={_Book.publisher} description={_Book.description}></Book>
                        ))}
                    </div>
                </div>
                :
                <div key={0} style={{backgroundColor: '#000080', height: "auto", overflow:"hidden", marginTop: "-30px", paddingRight: "20px"}}>
                    <>
                        <div className="bg"></div>
                        <div className="bg bg2"></div>
                        <div className="bg bg3"></div>
                        <div className="content" style={{color: "#7224bf", fontWeight: "bold", fontFamily: "Bookman"}}> WELCOME TO YOUR FAVORITE BOOK CLUB!</div>
                    </>
                </div>
            )
        ) 
    }
}

export default Home 