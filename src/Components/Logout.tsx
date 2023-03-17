import React from "react"
import { useNavigate } from "react-router-dom"
import '../App.css'
import { AttemptLogout } from "../Service/OTHER/LoginService"
import { useAuth } from "./Navbar/UseAuth"
import perikizi from '../images/perikizi.svg' 

export default function Logout(){
  
    const navigate = useNavigate()
    const { setAuth, user } = useAuth()
    const [loggedOut, setLoggedOut] = React.useState(false)
    const [message, setMessage] = React.useState("")
    
    const AttemptLogoutF = (e:any) => {
        e.preventDefault()
        
        AttemptLogout()
        .then((res) => {
            console.log("Status: ", res.status)
            if(res.status === 200 || res.status === 204){
                setLoggedOut(true)
                setAuth(0)
                localStorage.setItem("Auth", "0")   
                localStorage.setItem("Username", "")    
            }
            else{
                setMessage("Error! Please heck your connection and try again.")
            }
        })
        .catch((err) => console.log(err))

  }

  const RouteHome = (e:any) => {
    e.preventDefault()
    navigate("/")

  }

  return (
    <div>
      {loggedOut ? (
        <div style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"hidden", padding: "5%"}}>
          <img key={1} width={100} height={100} src={perikizi} alt="Fairy Woman image" />
          <h4 style={{color: "#000080"}}>Logged out successfully!</h4>
          <button className='input_submit'  onClick={(e) => RouteHome(e)}> Ok </button>
        </div>
      ) : (
         <form className='input'>
          <img key={1} width={100} height={100} src={perikizi} alt="Fairy Woman image" />
          <h3 style={{color: '#ffd700'}}>Are you sure you want to log out {user}?</h3>
          <button className='input_submit'  onClick={(e) => AttemptLogoutF(e)}> Click Here To Log Out </button>
          <h1 style={{color: 'red'}}>{message}</h1>
        </form>
      )}
    </div>
  )
}