import React, {useState, useEffect} from "react" 
import money from '../../images/money.svg' 
import trash from '../../images/trash_purple.svg' 
import book_and_man from '../../images/book.svg' 
import "../../App.css" 
import { GetBooksInMyBasket } from "../../Service/BookService" 
import { CreateOrder } from "../../Service/OTHER/OrderService"
import {Modal} from 'react-bootstrap'  
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import Button from 'react-bootstrap/Button' 
import Form from 'react-bootstrap/Form' 
import background from "../../images/clouds_tersx.jpg" 
import Confetti from "react-confetti" 

const timers = require('timers-promises') 
function MyBasket(){
    const [books, setBooks] = useState([]) 
    const [amounts, setAmounts] = useState([]) 
    const [show, setShow] = useState(false) 
    const [showBuy, setShowBuy] = useState(false) 
    const [delegate, setDelegate] = useState("") 
    const [bought, setBought] = useState(false) 
    const [email, setEMail] = useState("") 
    const [address, setAddress] = useState("") 
    const [areaCode, setAreaCode] = useState("") 
    const [phone, setPhone] = useState("") 
    const [message, setMessage] = useState("") 
  
    useEffect(() => {
        let myBag  = JSON.parse(localStorage.getItem("ShoppingBag")) || [] 
        if(myBag === null || myBag === undefined || typeof myBag === "undefined"){
            myBag = []  
        }

        let str = "" 
        myBag.map(
            (book) => (
                str = str + book.isbn + ","
            )
        )

        let mapOfBag = new Map() 
        myBag.map(
            (val) => (
                mapOfBag.set(val.isbn, val.amount)
            )
        )
        setAmounts(mapOfBag) 

        for (let entry of mapOfBag) { 
            console.log("Entry: ", entry)  
        }

        if(str.length === 0){
            setBooks([]) 
        }
        else{
            /*
             if(res.status > 300){
                        console.log("An error occurred emptying the bag :(")
                        const arr = [] 
                        setBooks([]) 
                        localStorage.setItem("ShoppingBag", JSON.stringify(arr)) 
                        str = "" 
                    }
             */
            GetBooksInMyBasket(str)
            .then(res => res.json())
            .then(
                (res) => {
                    setBooks(res) 
                },
                (error) => {
                    const arr = [] 
                    localStorage.setItem("ShoppingBag", JSON.stringify(arr)) 
                    console.log("Cannot find the book.") 
                }
            )
        } 
    }, []) 

    const removeFromBasket = (isbn) => {
        let filteredArray = books.filter(item => item.isbn !== isbn) 
        setBooks(filteredArray) 
        console.log(">>", amounts)
        amounts.delete(isbn) 
        console.log(">>", amounts)
        setAmounts(amounts) 
        let newBag = new Set() 
        filteredArray.forEach(x => newBag.add({isbn: x.isbn, amount: parseInt(amounts.get(x.isbn.toString()))})) 
        const arr = Array.from(newBag) 
        localStorage.setItem("ShoppingBag", JSON.stringify(arr)) 
    }

    const handleModal = (e, _bool) => {
        e.preventDefault() 
        console.log("pressed ", delegate) 
        if(_bool && delegate.length > 0){
            removeFromBasket(delegate) 
            console.log("Removed ", delegate) 
        }
        else if(delegate.length === 0){
            window.alert("Cannot find the book with isbn: " + delegate + "!") 
        }
        else{
            window.alert("Cancelled!")
        }
        setShow(!show) 
    }
    
    const CallModal = (e, isbn) => {
        e.preventDefault() 
        console.log("called ", isbn) 
        setDelegate(isbn) 
        setShow(!show) 
    }

    const PriceFormatter = (num) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num)
    }

    const Buy = async () => {
        if(phone === null || phone.toString().trim().length === 0 || address === null || address.toString().trim().length === 0 ||
         email === null || email.toString().trim().length === 0 || areaCode === null || areaCode.toString().trim().length === 0  ){
            setMessage("At least one of your input is invalid!")
            await timers.setTimeout(5000) 
            setMessage("") 
        }
        else{
            amounts.forEach(
                (_count, _isbn) => (
                    CreateOrder( {isbn: _isbn, username: email, count: _count, address: address, phone: phone, areacode: areaCode, checkval: false})
                    .then(res => res.json())
                    .then(
                        (res) => {
                            setBooks(res) 
                            const arr = [] 
                            localStorage.setItem("ShoppingBag", JSON.stringify(arr)) 
                            setBought(true)
                        },
                        (error) => {
                            setMessage("Cannot find the book. Please refresh.") 
                        }
                    )
                )
            )
        } 
    }

    const handleModalBuy = (e, _bool) => {
        e.preventDefault() 
        if(_bool){
            Buy() 
            console.log("Bought ") 
        }
        setShowBuy(!showBuy) 
    }
    
    const CallModalBuy = (e) => {
        e.preventDefault() 
        setShowBuy(!show) 
    }

    const onMailChange = (e) => {
        e.preventDefault() 
        setEMail(e.target.value) 
    }

    const onAddressChange = (e) => {
        e.preventDefault() 
        setAddress(e.target.value) 
    }
    
    const onAreaCodeChange = (e) => {
        e.preventDefault() 
        setAreaCode(e.target.value) 
    }

    const onPhoneChange = (e) => {
        e.preventDefault() 
        setPhone(e.target.value) 
    }

    if(bought){
        return(
            <div key={0} style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"hidden", backgroundImage: `url(${background})`, marginTop: "-30px"}}>
                <h1 key={1} style={{color: 'white'}}>Your Order Has Been Placed</h1>
                <Confetti
                    numberOfPieces={500}
                    width= {window.innerWidth || 300}
                    height= {window.innerHeight || 200}
                />
            </div>
        ) 
    }
    else if(books.length === 0){
        return(<div key={0} style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"auto", marginRight: "-20px", backgroundImage: `url(${background})`, marginTop: "-30px"}}>
                <h1 key={1} style={{color: 'white'}}>Your Baket Is Empty</h1>
            </div>
    ) 
        
    }
    else{
        return(
            <div key={0} style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"auto", marginRight: "-20px", backgroundImage: `url(${background})`, marginTop: "-30px"}}>
                <h1 key={1} style={{color: '#8400d8'}}>Your Basket</h1>
                <div key={2} className="container3" >
                    {books.map((_Book) => (
                        <div key={_Book.isbn} className="container4">
                            <Card key={_Book.title} className="card2">
                                <Card.Header key={4}>
                                    <Card.Img key={5} style={{ width: "auto", maxHeight: "200px", padding: '5px', position: 'relative' }} variant="top" src={book_and_man} />
                                </Card.Header>
                                <Card.Body key={6} style={{ position: 'relative', width: "200px", bottom: '20px' }}>
                                    <Card.Title key={7} style={{ color: 'navy' }}><strong>{_Book.title}</strong></Card.Title>
                                    <ListGroup key={8} variant="flush">
                                        <ListGroup.Item key={`${_Book.author}-author`}>
                                            {_Book.author}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup key={9} variant="flush">
                                        <ListGroup.Item key={`${_Book.publisher}-publisher`}>
                                            {_Book.publisher}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup key={10} variant="flush">
                                        <ListGroup.Item key={`${_Book.publisher}-publisher`}>
                                            <strong>X</strong> {amounts.get(_Book.isbn)}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup key={11} variant="flush">
                                        <ListGroup.Item key={`${_Book.price}-price`}>
                                            {PriceFormatter(amounts.get(_Book.isbn)* _Book.price)}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer key={12}>
                                    <Button key={13} className="trashButton" onClick={(e) => CallModal(e, _Book.isbn)}>
                                        <img key={14} width={30} height={30} src={trash} alt="Remove this item from basket." />
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))}
                    <Modal key={15} className="modalClass2" show={show} onHide={(e) => handleModal(e, false)}>
                        <Modal.Header key={16} style={{color: "#000080", fontWeight:"bolder"}}>Leave Item?</Modal.Header>
                        <Modal.Body>
                            <Button key={17} className="modalButtonCancel2" onClick={(e) => handleModal(e, false)}>No</Button>
                            <Button key={18} className="modalButtonOk2" onClick={(e) => handleModal(e, true)}>Yes</Button>
                        </Modal.Body>
                    </Modal>
                    <Modal key={19} className="modalClass3" show={showBuy} onHide={(e) => handleModalBuy(e, false)}>
                        <Modal.Header key={20} style={{color: "#000080", fontWeight:"bolder"}}>Last Step</Modal.Header>
                        <Modal.Body key={21}> 
                            <Form key={22}>
                                <Form.Group key={23} className="white_label" onChange={(e) => onMailChange(e)}>
                                    <Form.Label key={24}>Email address</Form.Label>
                                    <Form.Control key={25} className="input_box" type="email" placeholder="name@example.com" autoFocus/>
                                </Form.Group>
                                <Form.Group key={26} className="white_label" onChange={(e) => onAddressChange(e)}>
                                    <Form.Label key={27}>Address</Form.Label>
                                    <Form.Control key={28} className="input_box" as="textarea" rows={2} />
                                </Form.Group>
                                <Form.Group key={29} className="white_label" onChange={(e) => onAreaCodeChange(e)}>
                                    <Form.Label key={30}>Area Code</Form.Label>
                                    <Form.Control key={31} className="input_box" as="textarea" rows={1} />
                                </Form.Group>
                                <Form.Group key={32} className="white_label" onChange={(e) => onPhoneChange(e)}>
                                    <Form.Label key={33}>Phone Number</Form.Label>
                                    <Form.Control key={34} className="input_box" as="textarea" rows={1} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer> 
                            <Button key={35} className="modalButtonOk3" onClick={(e) => handleModalBuy(e, true)}>Yes, buy!</Button>
                            <Button key={36} className="modalButtonCancel3" onClick={(e) => handleModalBuy(e, false)}>No</Button>
                        </Modal.Footer>
                    </Modal>
                    <h1 style={{color: "red"}}>{message}</h1>
                    <button className='input_submit' onClick={(e)=>(CallModalBuy(e))}> <img src={money} height="35"/> Buy </button>
                </div>
            </div>
        ) 
    }
    
}

export default MyBasket 

