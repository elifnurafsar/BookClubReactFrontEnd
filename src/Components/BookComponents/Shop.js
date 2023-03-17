import {useState, useEffect} from "react" 
import logo from '../../images/kids_book.svg' 
import eye from '../../images/arrow.svg' 
import search from '../../images/search.svg' 
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import Button from 'react-bootstrap/Button' 
import img from '../../images/starry_sky.jpg' 
import basket from '../../images/blue_shopping_car.svg' 
import {Modal} from 'react-bootstrap'  
import Form from 'react-bootstrap/Form' 
import { GetBookByTitleOrType } from "../../Service/BookService" 
import ReactCardFlip from 'react-card-flip' 

function Shop(){
    const [error, setError] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [BookList, setBookList] = useState([]) 
    const [show, setShow] = useState(false)
    const [amount, setAmount] = useState(0)
    const [title, setTitle] = useState("")
    const [isbn, setIsbn] = useState("")
    const [myBag, setMyBag] = useState([])
    const [index, setIndex] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Trying Again...") 
        fetch("/Book")
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setBookList(results) 
                setError(false)
            },
            (error) => {
                setIsLoaded(false)
                setError(true)
            }
        )

        let _myBag  = JSON.parse(localStorage.getItem("ShoppingBag")) || [] 
        if(_myBag.length === undefined){
            _myBag = [] 
        }
        setMyBag(_myBag) 
    } 

    useEffect(() => {
        //api call
        fetch("/Book")
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setBookList(results) 
            },
            (error) => {
                setIsLoaded(false)
                setError(true)
            }
        )

        let _myBag  = JSON.parse(localStorage.getItem("ShoppingBag")) || [] 
        
        //control over size because other ways have not worked.
        if(_myBag.length === undefined){
            _myBag = [] 
        }
        setMyBag(_myBag) 

        _myBag.forEach(element => {
            console.log("inside my bag -> ", element.isbn, " ", element.amount) 
        }) 

    }, [])

    const searchFor = (e) => {
        var str = e.target.value 
        if(str.length === 0){
            fetch("/Book")
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setBookList(results) 
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    setIsLoaded(true)
                    setError(error)
                }
            )
        }

        else {
            GetBookByTitleOrType(str)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setBookList(results) 
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
        }
        
    }

    const ChangeSide = (e) => {
        e.preventDefault()
        setIndex(!index) 
    }

    const addBookToCard = (_amount) => {
        let _myBag = [] 
        if(myBag === null || myBag === undefined || typeof myBag === "undefined"){
            _myBag = new Set()  
        }
        else{
            console.log('Your Current Basket: ', myBag) 
            _myBag = new Set(myBag)  
        }
        
        let b = false 
        _myBag.forEach(element => {
            if(element.isbn === isbn){
                b = true 
                element.amount = parseInt(element.amount) + parseInt(_amount) 
            }
        }) 

        if(!b){
            _myBag.add({isbn: isbn, amount:  parseInt(_amount)}) 
        }

        //neccessary to convert this set to array to iterate over
        const myBagArr = Array.from(_myBag) 
        localStorage.setItem("ShoppingBag", JSON.stringify(myBagArr)) 

        let i=0 
        _myBag.forEach(element => {
            console.log(i, " ", element.isbn, " --> ", element.amount) 
            i++ 
        }) 
        setMyBag(_myBag) 
    }
    
    function handleModal(e, _isbn, _title, accept){  
        e.preventDefault() 
        setTitle(_title) 
        setIsbn(_isbn) 
        if(show && accept){
            if (amount === null || amount === 0) {
                window.alert("Cancelled!") 
            } else {
                addBookToCard(amount) 
                let s = _title + " X " + amount + "  added to basket" 
                window.alert(s.toString()) 
            }
        }
        setShow(accept) 
        setAmount(0) 
    } 

    function setAmountFunct(num){
        setAmount(num.target.value) 
    }

    const PriceFormatter = (num) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num)
    }

    if(error){
        return (<div>
                    <button className='input_submit' type='submit' onClick={(e) => onSubmit(e)}> ReFRESH </button>
                </div>) 
    }
    else if(!isLoaded){
        return (<div style={{backgroundColor: '#000080', height: "100vh"}}>
            <img width={200} height={200} src={logo} alt="fairy girl image for waiting screen"/>
            <br></br>
            LOADING...
        </div>) 
    }
    else{
        return(
            <div key={0} style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px"}}>

                <div key={1} style={{backgroundColor: '#000080'}}>
                    <img key={2} style={{ width: "20px", height: "20px"}}  src={search} alt="Search image for search input box"/>
                    <input key={3} type="text" placeholder='Search by name' className='input_box' onChange={e => searchFor(e)} />
                </div>
                <h1 key={4} style={{color: 'white', fontFamily: "Palatino"}}>Our Books</h1>
                
                <div key={5} className="container2" >
                    {BookList.map( _Book => (
                        <div key={`${_Book.isbn}-card`}>
                            <ReactCardFlip key={`${_Book.isbn}-card_flip`} isFlipped={index} flipDirection="vertical">
                                <Card key={_Book.isbn} border="secondary" style={{ width: '18rem', maxWidth: 200, height: '23rem', maxHeight: "auto", margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                                    <Card.Header key={`${_Book.isbn}-header`}>
                                        <Card.Img key={`${_Book.isbn}-img`} style={{ width: "auto", maxHeight: "200px", padding: '5px', position: 'relative' }} variant="top" src={img} />
                                    </Card.Header>
                                    <Button key={`${_Book.isbn}-button`} className='circleButton' onClick={(e) => handleModal(e, _Book.isbn, _Book.title, true)}>
                                        <img key={`${_Book.isbn}-image`} width={30} height={30} src={basket} alt="details" />
                                    </Button>
                                    <Card.Body key={`${_Book.isbn}-body`} style={{ position: 'relative', bottom: '20px' }}>
                                        <Card.Title key={12} style={{ color: 'navy', fontWeight: 'bold' }}><strong>{_Book.title}</strong></Card.Title>
                                        <ListGroup key={13} variant="flush">
                                            <ListGroup.Item key={`${_Book.author}-author`} style={{color: '#e6e6fa'}}>
                                                {_Book.author}
                                            </ListGroup.Item>
                                            <ListGroup.Item key={`${_Book.publisher}-publisher`} style={{color: '#e6e6fa'}}>
                                                {_Book.publisher}
                                            </ListGroup.Item>
                                            <ListGroup.Item key={`${_Book.price}-price`} style={{color: '#e6e6fa'}}>
                                                {PriceFormatter(_Book.price)}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer style={{display: "flex", alignItems: "self-end"}}>
                                        <Button key={`${_Book.isbn}-bottom_button`} className="flipButton" onClick={(e) => ChangeSide(e)}>
                                            <img key={`${_Book.isbn}-look`} width={20} height={20} style={{position: "absolute", bottom: "1px", right: "1px"}} src={eye} alt="details" />
                                        </Button>
                                    </Card.Footer>
                                </Card>
                                <Card key={`${_Book.isbn}-back`} border="secondary" style={{ width: '18rem', maxWidth: 200, height: '23rem', maxHeight: "auto", margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                                    <Card.Header key={`${_Book.isbn}-header_back`}>
                                        <Card.Title key={`${_Book.isbn}-title_back`} style={{ color: 'navy', fontWeight: 'bold' }}><strong>{_Book.title}</strong></Card.Title>
                                    </Card.Header>
                                    <Card.Body key={`${_Book.isbn}-body_back`} style={{ position: 'relative', padding: '10px' }}>
                                        <ListGroup key={`${_Book.isbn}-list_back`} variant="flush">
                                            <ListGroup.Item key={`${_Book.isbn}-list_element_back`} style={{color: '#e6e6fa'}}>
                                                {_Book.description}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer style={{display: "flex", alignItems: "self-end"}}>
                                        <Button key={`${_Book.isbn}-bottom_button_back`} className="flipButton" onClick={(e) => ChangeSide(e)}>
                                            <img key={`${_Book.isbn}-look_back`} width={20} height={20} style={{position: "absolute", bottom: "1px", right: "1px"}} src={eye} alt="details" />
                                        </Button>
                                    </Card.Footer>
                                </Card> 
                            </ReactCardFlip>
                        </div>
                    ))}
                    <Modal key={14} className="modalClass" show={show} onHide={(e) => handleModal(e, isbn, title, false)}>
                        <Modal.Header key={15} style={{color: "#000080", fontWeight:"bolder"}}>Add To Basket</Modal.Header>
                        <Modal.Body>
                            <Form key={16} style={{color: "#000080"}}>
                                <Form.Group key={17} className="mb-3">
                                    <Form.Label key={18}>Selected {title}: Please enter the amount:</Form.Label>
                                    <Form.Control key={19}
                                        className="input_box"
                                        type="number"
                                        placeholder="0"
                                        onChange={(num) => setAmountFunct(num)}
                                        autoFocus
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer key={20}>
                            <Button key={21} className="modalButtonCancel" onClick={(e) => handleModal(e, isbn, title, false)}>Close</Button>
                            <Button key={22} className="modalButtonOk" onClick={(e) => handleModal(e, isbn, title, true)}>Add</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        ) 
    }
}

export default Shop 