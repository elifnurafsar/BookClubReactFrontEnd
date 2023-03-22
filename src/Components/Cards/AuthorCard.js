import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button' 
import img from '../../images/shakespeare.svg'
import ReactCardFlip from 'react-card-flip'
import arrow from '../../images/arrow.svg' 

function AuthorCard(props) {
    const {name, website, biography} = props;
    const [index, setIndex] = useState(false)
    const ChangeSide = (e) => {
        e.preventDefault()
        setIndex(!index) 
    }
    return (
        <div>
            <ReactCardFlip isFlipped={index} flipDirection="vertical">
                <Card key={`${website}-card`} border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: 'auto',  maxHeight: 'auto', margin: 15,  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                    <Card.Header key={`${website}-header`}>
                        <Card.Img key={`${website}-image`} style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={img}/>
                    </Card.Header>
                    <Card.Body  key={`${website}-body`} style = {{padding: "10px"}}>
                        <Card.Title key={`${website}-title`} style={{color: '#191970', fontWeight: 'bold'}}>{name}</Card.Title>
                        <ListGroup key={`${website}-listG`} variant="flush" style={{ listStyle: 'none'}}>
                            <ListGroup.Item key={`${website}-listItem`} style={{ color: 'dimgray' }} action href={website}>Wikipedia</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer style={{display: "flex", alignItems: "self-end"}}>
                        <Button key={`${website}-bottom_button`} className="flipButton" onClick={(e) => ChangeSide(e)}>
                            <img key={`${website}-flip`} width={20} height={20} style={{position: "absolute", bottom: "1px", right: "1px"}} src={arrow} alt="details" />
                        </Button>
                    </Card.Footer>
                </Card>
            
                <Card key={`${website}-cardBack`} border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: 'auto',  maxHeight: 'auto', margin: 15,  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                    <Card.Header  key={`${website}-header_back`}>
                        <Card.Title  key={`${website}-title_back`} style={{color: '#191970', fontWeight: 'bold'}}>{name}</Card.Title>
                    </Card.Header>
                    <Card.Body key={`${website}-body_back`} style = {{padding: "10px"}}>
                        <ListGroup  key={`${website}-listG_back`} variant="flush" style={{ listStyle: 'none'}}>
                            <ListGroup.Item  key={`${website}-item_back`} style={{color: '#fff0f5'}}>{biography}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer style={{display: "flex", alignItems: "self-end"}}>
                        <Button key={`${website}-bottom_button`} className="flipButton" onClick={(e) => ChangeSide(e)}>
                            <img key={`${website}-flip`} width={20} height={20} style={{position: "absolute", bottom: "1px", right: "1px"}} src={arrow} alt="details" />
                        </Button>
                    </Card.Footer>
                </Card>
            </ReactCardFlip>
        </div>
    )
}

export default AuthorCard;