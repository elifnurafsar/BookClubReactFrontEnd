import {Link} from "react-router-dom"
import React from 'react'
import logo from '../../images/fairy_man.svg'
import search from '../../images/search.svg'
import '../../App.css'


//https://cssgradient.io/
export default function NavbarUserAuthenticaed(){
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
      setOpen(!open)
    }

    return(
        <div className="navbar">
            <div className="logo">
                <img  style={{ width: "100px", height: "100px"}}  src={logo} alt="Book Club Logo"/>
            </div>
            <div className="navbar-sub"  style={{flexGrow:1}}>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/">Home Page</Link>
                </div>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/shop">Shop</Link>
                </div>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/myBasket">My Basket</Link>
                </div>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/profile">Profile</Link>
                </div>
            </div>
            <div className="underLine2 hide_on_responsive">
                <button className="navbar-element" onClick={handleOpen}>
                    Search Our ...
                    <img  style={{ width: "20px", height: "20px"}}  src={search} alt="Search our publishers or authors"/>
                </button>
                {open ? (
                    <ul style={{ textDecoration: 'none', listStyle: 'none'}}>
                        <li  key="{publisher}">
                            <Link className="link" style={{ textDecoration: 'none', color: 'white'}} to="/publishers">Publishers</Link>
                        </li>
                        <li key="{author}">
                            <li><Link className="link" style={{ textDecoration: 'none', color: 'white'}} to="/authors">Authors</Link></li>
                        </li>
                    </ul>
                ) : null}
            </div>
            <div className="navbar-sub"  style={{flexGrow:1}}>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/logout" >Logout</Link>
                </div>
            </div>
        </div>
    )

}