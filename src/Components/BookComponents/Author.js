import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import logo from '../../images/kids_book.svg';
import img from '../../images/starry_sky.jpg';
import { GetAuthorByName } from "../../Service/AuthorService";
import search from '../../images/search.svg';
import leprechaun from '../../images/leprechaun.svg';
import AuthorCard from "../Cards/AuthorCard";

function Author(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [authorList, setAuthorList] = useState([]);

    useEffect(() => {
        //api call
        fetch("Author/")
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true);
                setAuthorList(results);
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(true)
                setError(error)
            }
        )
    }, [])

    const searchFor = async(e) => {
        var str = e.target.value;
        if(str.length === 0){
            await fetch("Author/")
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true);
                    setAuthorList(results);
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                    setError(error)
                }
            )
        }
        else{
            await GetAuthorByName(str)
            .then(res => res.json())
            .then(
                (res) => {
                    //data loaded
                    setIsLoaded(true);
                    setAuthorList(res);
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                    
                    return(
                        <div>
                            <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}>
                                <img  style={{ width: "20px", height: "20px"}}  src={search} alt="Book Club Logo"/>
                                <input type="text" placeholder='Name' className='input_box' onChange={e => searchFor(e)} />
                            </div>
                            <h1 style={{color: 'white'}}>Our Authors</h1>
                            <div className="container2" >
                                {authorList.map( Author => (
                                    <AuthorCard name={Author.name} website={Author.website} biography={Author.biography}></AuthorCard>
                                ))}
                            </div>
                        </div>
                    );
                }
            )
        }
        
    }

    if(error){
        return (
            <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}>
                <img width={100} height={100} style={{marginTop: "5%"}} src={leprechaun} alt="Error screen image. A little girl drawing who has purple hair and pink cone party hut."/>
                <br></br>
                <h1 style={{color: "whitesmoke"}}>Error!</h1> 
            </div>)
    }
    else if(!isLoaded){
        return (<div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}>
            <img width={100} height={100} style={{marginTop: "5%"}} src={logo} alt="loading screen image. A little girl drawing who has purple hair and pink cone party hut."/>
            <br></br>
            <h1 tyle={{color: "whitesmoke"}}>LOADING...</h1>
        </div>)
    }
    else{
        return(
            <div style={{backgroundColor: '#000080', height: "auto", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}>
                <div>
                    <img  style={{ width: "20px", height: "20px"}}  src={search} alt="Search image for search input box"/>
                    <input type="text" placeholder='Name' className='input_box' onChange={e => searchFor(e)} />
                </div>
                <h1 style={{color: 'white'}}>Our Authors</h1>
                
                <div className="container2" >
                    {authorList.map( Author => (
                        <AuthorCard name={Author.name} website={Author.website} biography={Author.biography}></AuthorCard> 
                    ))}
                </div>
            </div>
        );
    }
}

export default Author;