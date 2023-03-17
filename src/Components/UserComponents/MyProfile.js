import {useState, useEffect} from "react" 
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import logo from '../../images/kids_book.svg'
import spellbook from '../../images/spellbook.svg' 
import { GetOrdersByUsername } from "../../Service/OTHER/OrderService" 
import { GetBooksInMyBasket } from "../../Service/BookService"
import { useAuth } from "../Navbar/UseAuth";
import bg from "../../images/abstractBackground.jpg"

//https://wallpapercave.com/w/wp10352814

export default function MyProfile(){
    const { user } = useAuth()
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [orderList, setOrderList] = useState([]) 
    const [bookList, setBookList] = useState([]) 
    const [bookNameList, setBookNameList] = useState([]) 

    useEffect(() => {
        //api call
        GetOrdersByUsername(user)
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setOrderList(results) 
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(true)
            }
        )
        .then(() => {setBookNames()})
    }
    , [])

    const refresh = (e) => {
        e.preventDefault()
        GetOrdersByUsername(user)
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setOrderList(results)
                setError(false) 
            },
            (error) => {
                //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                setIsLoaded(false)
                setError(true) 
                setErrorMessage("Cannot get orders. Please control your connection!")
            }
        )
        .then(() => {setBookNames()})
    }

    const setBookNames = () => {
        let str = "" 
        orderList.map(
            (book) => (
                str = str + book.isbn + ","
            )
        )
        if(str.length === 0){
            /*setError(true)
            setBookList([])
            setErrorMessage("Cannot get book names in your orders. Please control your connection!")*/
        }
        else{
            GetBooksInMyBasket(str)
            .then(res => res.json())
            .then(
                (res) => {
                    setBookList(res) 
                },
                (error) => {
                    setError(true)
                    setBookList([])
                    setErrorMessage("Cannot get book names in your orders. Please control your connection!")
                }
            )
        }  
        let _nameList = new Map()
        bookList.map(
            (val) => (
                _nameList.set(val.isbn, val.title)
            )
        )
        setBookNameList(_nameList)
    }

    const DateFormatter = (orderDate) => {
        return new Date(Date.parse(orderDate)).toString()
    }

    if(error){
        return (<div className="container">
            {user.toString().length === 0 ? 
            <h3 style={{color: '#cfcfe6'}} >Please Login</h3> 
            : 
            <div>
                <h3 style={{color: '#e65100'}} >{errorMessage}</h3>
                <button className='input_submit' onClick={(e) => refresh(e)}> ReFRESH </button>
            </div>
            }
        </div>) 
    }
    else if(!isLoaded){
        return (<div >
            <img width={100} height={100} src={logo} alt="loading screen image. A little girl drawing who has purole hair and pink cone party hut."/>
            <br></br>
            LOADING...
        </div>) 
    }
    else{
        return (
            <div style={{background: "linear-gradient(90deg, rgba(0,0,128,1) 0%, rgba(0,255,171,1) 100%)", height: "100vh", overflow:"hidden"}}>
            <h1 style={{color: '#f07000', fontFamily: "Palatino"}}>My Orders</h1>
            
            <div className="container2_1" style={{marginTop: "50px"}}> 
                {orderList.map( _Order => ( 
                    <div key={_Order.isbn} className="container5">
                        <Card key={_Order.isbn} className="card3" style={{ backgroundImage:  `url(${bg})`,  backgroundSize: "cover"}}>
                            <Card.Header key={4}>
                                <Card.Img key={5} style={{ width: "auto", maxHeight: "200px", padding: '5px', position: 'relative' }} variant="top" src={spellbook} onClick={()=>setBookNames()}/>
                            </Card.Header>
                            <Card.Body key={6} style={{ position: 'relative', width: "200px", bottom: '20px' }}>
                                <Card.Title key={7} style={{ color: 'navy', marginTop: "20%" }}><strong>{(bookNameList.get(_Order.isbn) ? bookNameList.get(_Order.isbn) : _Order.isbn) }</strong></Card.Title>
                                <ListGroup key={8} variant="flush">
                                    <ListGroup.Item key={`${_Order.count}-count`}>
                                        <strong>X</strong> {_Order.count}
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={9} variant="flush">
                                    <ListGroup.Item key={`${_Order.address}-address`} style={{color:"#f07000"}}>
                                        <strong>Address:</strong> {_Order.address}
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={10} variant="flush">
                                    <ListGroup.Item key={`${_Order.phone}-phone`} style={{color:"#f07000"}}>
                                        <strong>Phone:</strong> {_Order.phone}
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup key={11} variant="flush">
                                    <ListGroup.Item key={`${_Order.created_at}-time`} style={{color:"#f07000"}}>
                                       <strong>Ordered At:</strong> {DateFormatter(_Order.created_at)}
                                    </ListGroup.Item>
                                </ListGroup>
                                {_Order.checkval === true ? 
                                    <ListGroup key={13} variant="flush" style={{ listStyle: 'none', padding: "5px"}}>
                                        <ListGroup.Item style={{color: '#4dd0e1'}}>Checked</ListGroup.Item>
                                    </ListGroup>
                                : 
                                    <ListGroup key={14} variant="flush" style={{ listStyle: 'none', padding: "5px"}}>
                                        <ListGroup.Item style={{color: '#eb144c', fontWeight: "bold"}}>Waiting to be checked</ListGroup.Item>
                                    </ListGroup>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div> 
        )
    }
}