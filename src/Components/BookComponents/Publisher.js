import React, {useState, useEffect} from "react"
import logo from '../../images/kids_book.svg'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import img from '../../images/starry_sky.jpg'
import { GetPublisherByName } from "../../Service/PublisherService"

function Publisher(){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [publisherList, setPublisherList] = useState([])

    useEffect(() => {
        //api call
        fetch("Publisher/")
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true)
                setPublisherList(results)
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(true)
                setError(error)
            }
        )
    }, [])

    const searchFor = (e) => {
        var str = e.target.value 
        if(str.length === 0){
            fetch("Publisher/")
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setPublisherList(results) 
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                    setError(error)
                }
            )
        }
        GetPublisherByName("/Publisher", str)
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setPublisherList(results) 
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(true)
                return(
                    <div style={{backgroundColor: '#000080', height: "auto", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}>
                        <input type="text" placeholder='Name' className='input_box' onChange={(i) => searchFor(i)} />
                        <h1 style={{color: 'white'}}>Our Publishers</h1>
                        <div className="container2" >
                            {publisherList.map( Publisher => (
                                <Card border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: 'auto',  maxHeight: 'auto', margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                                    <Card.Img style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={img}/>
                                    <Card.Body>
                                        <Card.Title style={{color: '#191970', fontWeight: 'bold'}} key="{publisher_name}">{Publisher.name}</Card.Title>
                                        <ListGroup variant="flush" style={{ listStyle: 'none'}}>
                                            <ListGroup.Item style={{ color: '#c0c0c0' }} key="{website}" href={Publisher.website}>{Publisher.website}</ListGroup.Item>
                                            <ListGroup.Item style={{color: '#fff0f5'}} key="{phone}">{Publisher.phone}</ListGroup.Item>
                                            <ListGroup.Item style={{color: '#fff0f5'}} key="{address}">{Publisher.address}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>  
                            ))}
                        </div>
                    </div>
                ) 
            }
        )
    }

    if(error){
        return (<div> Error! </div>)
    }
    else if(!isLoaded){
        return (<div style={{backgroundColor: '#000080', height: "auto", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}> 
            <img width={100} height={100} src={logo} alt="loading screen image as a little girl who has a purple hair and pink party cone hut." />
            <br></br>
            LOADING...
        </div>) 
    }
    else{
        return(
            <div style={{backgroundColor: '#000080', height: "auto", overflow:"auto", marginRight: "-20px", marginTop: "-30px"}}>
                <input type="text" placeholder='Name' className='input_box' onChange={(i) => searchFor(i)} />
                <h1 style={{color: 'white'}}>Our Publishers</h1>
                <div className="container2" >
                    {publisherList.map( Publisher => (
                        <Card border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: '25rem',  maxHeight: 'auto', margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                          <Card.Img style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={img}/>
                            <Card.Body>
                            <Card.Title style={{color: '#191970', fontWeight: 'bold'}} key="{publisher_name}">{Publisher.name}</Card.Title>
                                <ListGroup variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{ color: '#c0c0c0' }} key="{website}" href={Publisher.website}>{Publisher.website}</ListGroup.Item>
                                    <ListGroup.Item style={{color: '#fff0f5'}} key="{phone}">{Publisher.phone}</ListGroup.Item>
                                    <ListGroup.Item style={{color: '#fff0f5'}} key="{address}">{Publisher.address}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card> 
                    ))}
                </div>
            </div>
        )
    }
}

export default Publisher