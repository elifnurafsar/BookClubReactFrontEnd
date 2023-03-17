import React, {useState, useEffect} from "react" 
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import logo from '../../images/kids_book.svg' 
import edit from '../../images/edit.svg' 
import img from '../../images/starry_sky.jpg' 
import { GetOrders } from "../../Service/OTHER/OrderService"
import Button from 'react-bootstrap/Button' 
import UpdateOrDeleteOrder from "./UpdateOrDeleteOrder" 
import leprechaun from '../../images/leprechaun.svg'
import { useAuth } from "../Navbar/UseAuth"

function Orders(){
    const { auth } = useAuth()
    const [error, setError] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [orderList, setOrderList] = useState([]) 
    const [updateMode, setupdateMode] = useState(false) 
    const [id, setID] = useState("") 


    useEffect(() => {
        //api call
        GetOrders()
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setOrderList(results) 
                setError(null)
            },
            (error) => {
                setIsLoaded(false)
                setError("Cannot load orders please try again!")
            }
        )
    }
    , [])

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
        GetOrders()
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setOrderList(results) 
                setError(null)
            },
            (error) => {
                setIsLoaded(false)
                setError("Cannot load orders please try again!")
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
            <div className="container6">
                <h3 key={1} style={{color: '#e65100'}} >{error}</h3>
                <button key={2} className='input_submit' onClick={(e) => refresh(e)}> ReFRESH </button>
            </div>
        )
    }
    else if(!isLoaded){
        return (<div>
            <img key={1} width={100} height={100} src={logo} alt="loading screen image. A little girl drawing who has purole hair and pink cone party hut."/>
            <br></br>
            LOADING...
        </div>) 
    }
    else{
        if(updateMode){
            return (
                <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px"}}>
                    <UpdateOrDeleteOrder key={id} id={id}></UpdateOrDeleteOrder>
                    <Button className='input_warning' key={8} onClick={(e) => turnBack(e)}>
                        Back
                    </Button>
                </div>
            ) 
        }
        else return(
            <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px"}}>
                <h1 style={{color: 'white'}}>Orders Assigned</h1>
                
                <div className="container2" >
                    {orderList.map( _Order => (
                        <Card key={_Order.id} border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: 'auto',  maxHeight: 'auto', margin: 15, background: 'linear-gradient(90deg, rgba(27,40,178,1) 0%, rgba(0,228,255,1) 100%)' }}>
                            <Card.Header key={0}>
                                <Card.Img key={1} style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={img}/>
                            </Card.Header>
                            <Button className="editButton" key={2} onClick={(e) => handleUpdate(e, _Order.id)}>
                                <img key={3} width={30} height={30} src={edit} alt="Edit" />
                            </Button>
                            <Card.Body>
                                <Card.Title style={{color: '#191970', fontWeight: 'bold'}}>{_Order.email}</Card.Title>
                                <ListGroup key={4} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{ color: '#d8bfd8' }}>{_Order.isbn}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={5} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{ color: '#ffd700' }}>X {_Order.count}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={6} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{color: '#fff0f5'}}>{_Order.phone}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={7} variant="flush" style={{ listStyle: 'none'}}>
                                    <ListGroup.Item style={{color: '#fff0f5'}}>{_Order.address}</ListGroup.Item>
                                </ListGroup>
                                {_Order.checkval === true ? 
                                    <ListGroup key={8} variant="flush" style={{ listStyle: 'none', padding: "5px"}}>
                                        <ListGroup.Item style={{color: '#fff0f5'}}>Checked</ListGroup.Item>
                                    </ListGroup>
                                : 
                                    <ListGroup key={9} variant="flush" style={{ listStyle: 'none', padding: "5px"}}>
                                        <ListGroup.Item style={{color: '#ff0000', fontWeight: "bold"}}>Please Check</ListGroup.Item>
                                    </ListGroup>
                                }
                            </Card.Body>
                        </Card> 
                    ))}
                </div>
            </div>
        ) 
    }
}

export default Orders; 