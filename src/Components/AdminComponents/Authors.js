import React, {useState, useEffect} from "react" 
import {Link} from "react-router-dom" 
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import logo from '../../images/kids_book.svg' 
import edit from '../../images/edit.svg' 
import img from '../../images/starry_sky.jpg' 
import leprechaun from '../../images/leprechaun.svg' 
import { SearchAuthorsWithID, GetAuthorsWithID } from "../../Service/AuthorService" 
import search from '../../images/search.svg' 
import Button from 'react-bootstrap/Button' 
import UpdateOrDeleteAuthor from "./DeleteOrUpdateAuthor" 
import { useAuth } from "../Navbar/UseAuth" 

function Authors(){
    const { auth } = useAuth()
    const [error, setError] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [authorList, setAuthorList] = useState([]) 
    const [updateMode, setupdateMode] = useState(false) 
    const [id, setID] = useState("") 


    useEffect(() => {
        //api call
        GetAuthorsWithID()
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setAuthorList(results) 
                setError(null)
            },
            (error) => {
                setIsLoaded(false)
                setError("Cannot load authors please try again!")
            }
        )
    }
    , [])

    const searchFor = async(e) => {
        var str = e.target.value 
        if(str.length === 0){
            await GetAuthorsWithID()
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setAuthorList(results) 
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                }
            )
        }
        else{
            await SearchAuthorsWithID(str)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setAuthorList(results) 
                    setError(null)
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                    setError(null)
                }
            )
        }
        
    }

    const handleUpdate = (e, _id) => {
        e.preventDefault() 
        setID(_id) 
        setupdateMode(true) 
    }

    const turnBack = (e) => {
        e.preventDefault() 
        setupdateMode(false) 
        refresh() 
    }

    const refresh = () => {
        GetAuthorsWithID()
        .then(res => res.json())
        .then(
            (res) => {
                //data loaded
                setAuthorList(res) 
                setIsLoaded(true) 
                setError(null)
            },
            (error) => {
                setIsLoaded(false)
                setError("Cannot load authors please try again!")
            }
        )
    }

    if(auth != 2){
        return (
        <div className="container6">
            <img key={1} width={100} height={100} src={leprechaun} alt="Leprechaun image" />
            <h3 key={2} style={{color: '#cfcfe6'}} >Please Login!</h3>
        </div>
        )
    }
    else if(error){
        return (
            <div className="container">
                <div>
                    <h3 key={1} style={{color: '#e65100'}} >{error}</h3>
                    <button key={2} className='input_submit' onClick={(e) => refresh(e)}> ReFRESH </button>
                </div>
            </div>
        )
    }
    else if(!isLoaded){
        return (<div>
            <img key={3} width={100} height={100} src={logo} alt="loading screen image. A little girl drawing who has purole hair and pink cone party hut."/>
            <br></br>
            LOADING...
        </div>) 
    }
    else{
        if(updateMode){
            return (
                <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px"}}>
                    <UpdateOrDeleteAuthor key={id} id={id}></UpdateOrDeleteAuthor>
                    <Button className='input_warning' key={8} onClick={(e) => turnBack(e)}>
                        Back
                    </Button>
                </div>
            ) 
        }
        else return(
            <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px"}}>
                <div style={{backgroundColor: '#000080'}}>
                    <img key={6} style={{ width: "20px", height: "20px"}}  src={search} alt="Search image for search input box"/>
                    <input key={7} type="text" placeholder='Name' className='input_box' onChange={e => searchFor(e)} />
                </div>
                <h1 style={{color: 'white'}}>Our Authors</h1>
                
                <div className="container2" >
                    {authorList.map( _Author => (
                        <Card key={_Author.id} border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: 'auto',  maxHeight: 'auto', margin: 15,  background: 'linear-gradient(90deg, rgba(27,40,178,1) 0%, rgba(0,228,255,1) 100%)' }}>
                            <Card.Header key={0}>
                                <Card.Img key={1} style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={img}/>
                            </Card.Header>
                            <Button className="editButton" key={2} onClick={(e) => handleUpdate(e, _Author.id)}>
                                <img key={3} width={30} height={30} src={edit} alt="Edit" />
                            </Button>
                            <Card.Body>
                                <Card.Title style={{color: '#191970', fontWeight: 'bold'}}>{_Author.name}</Card.Title>
                                <ListGroup key={4} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{ color: '#c0c0c0' }} action href={_Author.website}>Wikipedia</ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={5} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{color: '#fff0f5'}}>{_Author.biography}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card> 
                    ))}
                </div>
            </div>
        ) 
    }
}

export default Authors 