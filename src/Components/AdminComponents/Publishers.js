import React, {useState, useEffect} from "react" 
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import logo from '../../images/kids_book.svg' 
import edit from '../../images/edit.svg' 
import img from '../../images/starry_sky.jpg' 
import leprechaun from '../../images/leprechaun.svg'
import { GetPublishersWithIDByName, GetPublishersWithID } from "../../Service/PublisherService" 
import search from '../../images/search.svg' 
import Button from 'react-bootstrap/Button' 
import UpdateOrDeletePublisher from "./DeleteOrUpdatePublisher" 
import { useAuth } from "../Navbar/UseAuth"

function PublishersAdmin(){
    const { auth } = useAuth()
    const [error, setError] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [publisherList, setPublisherList] = useState([]) 
    const [updateMode, setupdateMode] = useState(false) 
    const [id, setID] = useState("") 

    useEffect(() => {
        //api call
        GetPublishersWithID()
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setPublisherList(results) 
                setError(null)
            },
            (error) => {
                setIsLoaded(false)
                setError("Cannot load publishers please try again!")
            }
        )
    }
    , [])

    const searchFor = async(e) => {
        var str = e.target.value 
        if(str.length === 0){
            await GetPublishersWithID()
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setPublisherList(results) 
                    setError(null)
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                    setError(null)
                }
            )
        }
        else{
            await GetPublishersWithIDByName(str)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setPublisherList(results) 
                    setError(null)
                },
                (error) => {
                    setIsLoaded(false)
                    setError("Cannot get publisher with name: " + {str} + ". Please try again!")
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
        GetPublishersWithID()
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setPublisherList(results) 
                setError(null)
            },
            (error) => {
                setIsLoaded(false)
                setError("Cannot load publishers please try again!")
            }
        )
    }

    if(auth != 2){
        return (
        <div className="container">
            <img key={1} width={30} height={30} src={leprechaun} alt="Leprechaun image" />
            <h3 key={2} style={{color: '#cfcfe6'}} >Please Login</h3>
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
            <img width={100} height={100} src={logo} alt="loading screen image. A little girl drawing who has purole hair and pink cone party hut."/>
            <br></br>
            LOADING...
        </div>) 
    }
    else{
        if(updateMode){
            return (
                <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px"}}>
                    <UpdateOrDeletePublisher key={id} id={id}></UpdateOrDeletePublisher>
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
                <h1 style={{color: 'white'}}>Our Publishers</h1>
                
                <div className="container2" >
                    {publisherList.map( _Publisher => (
                        <Card key={_Publisher.id} border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: 'auto',  maxHeight: 'auto', margin: 15,  background: 'linear-gradient(90deg, rgba(27,40,178,1) 0%, rgba(0,228,255,1) 100%)' }}>
                            <Card.Header key={0}>
                                <Card.Img key={1} style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={img}/>
                            </Card.Header>
                            <Button className="editButton" key={2} onClick={(e) => handleUpdate(e, _Publisher.id)}>
                                <img key={3} width={30} height={30} src={edit} alt="Edit" />
                            </Button>
                            <Card.Body>
                                <Card.Title style={{color: '#191970', fontWeight: 'bold'}}>{_Publisher.name}</Card.Title>
                                <ListGroup key={4} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{ color: '#c0c0c0' }} action href={_Publisher.website}>Wikipedia</ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={5} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{color: '#fff0f5'}}>{_Publisher.phone}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={6} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{color: '#fff0f5'}}>{_Publisher.address}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card> 
                    ))}
                </div>
            </div>
        ) 
    }
}

export default PublishersAdmin 