import {Link} from "react-router-dom"
import React from 'react'
import admin_logo from '../../images/admin.svg'
import '../../App.css'


//https://cssgradient.io/
export default function NavbarAdmin(){

    const [openAuthor, setOpenAuthor] = React.useState(false)
    const [openPublisher, setOpenPublisher] = React.useState(false)
    const [openBook, setOpenBook] = React.useState(false)

    const handleOpenAuthor = () => {
        setOpenAuthor(!openAuthor)
    }

    const handleOpenPublisher = () => {
        setOpenPublisher(!openPublisher)
    }

    const handleOpenBook = () => {
        setOpenBook(!openBook)
    }

    return(
        <div className="navbar2">
            <div className="logo">
                <img  style={{ width: "100px", height: "100px"}}  src={admin_logo} alt="Book Club Logo"/>
            </div>
            <div className="navbar-sub"  style={{flexGrow:1}}>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/">Home Page</Link>
                </div>
                <div className="underLine2 hide_on_responsive">
                    <button className="navbar-element" onClick={handleOpenAuthor}>
                        Authors ...
                    </button>
                    {openAuthor ? (
                        <ul style={{ textDecoration: 'none', listStyle: 'none'}}>
                            <li  key="{addAuthor}">
                                <Link className="link" style={{ textDecoration: 'none', color: 'white'}} to="/addAuthor">Add Author</Link>
                            </li>
                            <li key="{authors}">
                                <Link className="link" style={{ textDecoration: 'none', color: 'white'}} to="/authorsAdmin">Authors</Link>
                            </li>
                        </ul>
                    ) : null}
                </div>

                <div className="underLine2 hide_on_responsive">
                    <button className="navbar-element" onClick={handleOpenPublisher}>
                        Publishers ...
                    </button>
                    {openPublisher ? (
                        <ul style={{ textDecoration: 'none', listStyle: 'none'}}>
                            <li key="{addPublisher}">
                                <Link className="link" to="/addPublisher">Add Publisher</Link>
                            </li>
                            <li key="{publishers}">
                                <Link className="link" to="/publishersAdmin">Publishers</Link>
                            </li>
                        </ul>
                    ) : null}
                </div>

                <div className="underLine2 hide_on_responsive">
                    <button className="navbar-element" onClick={handleOpenBook}>
                        Books ...
                    </button>
                    {openBook ? (
                        <ul style={{ textDecoration: 'none', listStyle: 'none'}}>
                            <li key="{addPublisher}">
                                <Link className="link" to="/createBook">Add Book</Link>
                            </li>
                            <li key="{publishers}">
                                <Link className="link" to="/updateOrDelete">Update/Delete Book</Link>
                            </li>
                        </ul>
                    ) : null}
                </div>
                
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/orders">Orders</Link>
                </div>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/discount">Discounts</Link>
                </div>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/logout" >Logout</Link>
                </div>
            </div>
        </div>
    )
    
}