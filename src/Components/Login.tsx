import React from "react"
import { useNavigate } from "react-router-dom" 
import perikizi from '../images/perikizi.svg' 
import '../App.css' 
import { AttemptLogin, Register } from "../Service/OTHER/LoginService" 
import { useAuth } from "./Navbar/UseAuth" 
//npm i timers-promises

const timers = require('timers-promises') 
export default function Login(){

    const { setAuth, setUser } = useAuth() 
    const navigate = useNavigate() 
    const [username, setUsername] = React.useState("") 
    const [password, setPassword] = React.useState("") 
    const [curr, setCurr] = React.useState(0) 
    const [attempt, setAttempt] = React.useState(0) 
    const [message, setMessage] = React.useState("")
    const [ableToCreate, setAbleToCreate] = React.useState(true)
    const [showButton, setShowButton] = React.useState(true)

    //localStorage.setItem("CreationQuota", "0")
    let createdAccounts = localStorage.getItem("CreationQuota") || "0"
    if(parseInt(createdAccounts) === 2){
        setAbleToCreate(false)
    }

    const onChangeName = (e:any) => {
        e.preventDefault() 
        setUsername(e.target.value) 
    }
  
    const onChangePassword = (e:any) => {
        e.preventDefault() 
        setPassword(e.target.value) 
    }
  
    const createBasicAuthToken = (username: string, password: string) => { 
        console.log("In login page: ", window.btoa(username + ":" + password))
        return 'Basic ' + window.btoa(username + ":" + password)
    }
  
    const AttemptLoginF = (e: any)  => { 
        e.preventDefault() 
       
        AttemptLogin(
            createBasicAuthToken(username, password)
        )
        .then(async (res) => {
            if(res.status === 200){
                setCurr(1)   
                let auth = "" 
                await res.json().then((res)=>{ 
                    auth = res.authority
                })    
                if(auth === "USER"){
                    
                    setAuth(1)  
                    setUser(username)
                    //might be commented
                    localStorage.setItem("Auth", "1")
                    localStorage.setItem("Username", username)
                }
                else if(auth === "ADMIN"){
                   
                    setAuth(2)  
                    setUser(username)
                    //might be commented
                    localStorage.setItem("Auth", "2")
                    localStorage.setItem("Username", username)
                }    
            }
            else{
                let num = attempt + 1 
                if( num === 4){
                    setMessage("You have entered wrong information for 3 times. Please wait for 5 seconds") 
                    setShowButton(false) 
                    await timers.setTimeout(5000) 
                    setAttempt(0) 
                    setMessage("") 
                    setShowButton(true) 
                }
                else {
                    setAttempt(num)  
                }
            }
        })
        .catch((err) => console.log("Error: ", err))
    }
  
    const RegisterF = (e: any)  => { 
        e.preventDefault() 

        if(ableToCreate === false){
            setCurr(0)
            setMessage("You have already created 2 accounts. You are not allowed to create new account.") 
        }
        else if(username === null || password === null || username.trim().length <= 3 || password.trim().length <= 3){
            setCurr(0)
            setMessage("The username have to contain at least 4 characters and password have to contain at least 5 characters!") 
        }
        else{
            Register({
                username: username, 
                password: password,
                enabled: true,
                authority: "USER"
            })
          .then((res) => {
              console.log("Status: ", res.status)
              if(res.status === 200){
                setCurr(2) 
                let quota: string =  localStorage.getItem("CreationQuota") || "0" 
                let accounts_created: number = parseInt(quota) + 1 
                localStorage.setItem("CreationQuota", accounts_created.toString())      
              }
              else{
                setCurr(0) 
                setMessage("A problem occurred while creating a new account!") 
              }
          })
          .catch((err) => {
            setMessage(err + " Please Try Again")
            setCurr(0)
          })
        }
    }
  
    const NowLogin = (e: any)  => { 
        e.preventDefault() 
        setCurr(0) 
    }
  
    const RouteHome = (e: any)  => { 
        e.preventDefault() 
        navigate("/") 
    }

      return (
        <div>
          {curr === 1 ? (
            <div style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"hidden", padding: "5%"}}>
                <img key={1} width={100} height={100} src={perikizi} alt="Fairy Woman image" />
                <h5 key={2} style={{color: "#000080"}}>Logged in successfully!</h5>
                <p key={3} style={{color: "orchid"}}>{username}</p>
                <button key={4} className='input_submit'  onClick={(e) => RouteHome(e)}> Ok </button>
            </div>
          ) : (
              curr === 2 ? (
                  <div style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"hidden", padding: "5%"}}>
                    <h4>Registered successfully!</h4>
                    <img key={1} width={100} height={100} src={perikizi} alt="Fairy Woman image" />
                    <h4 key={2} style={{color: "#000080"}}>Registered in successfully!</h4>
                    <p key={3} style={{color: "orchid"}}>{username}</p>
                    <button key={4} className='input_submit'  onClick={(e) => NowLogin(e)}> Ok </button>
                  </div>
              ) :
              (
              <form className='input'>
  
                  <label htmlFor="title" style={{color: '#ffd700'}}>User Name</label>
                  <input
                    type="text"
                    className="input_box"
                    id="title"
                    value={username}
                    onChange={onChangeName}
                  />
  
                  <label htmlFor="description" style={{color: '#ffd700'}}>Password</label>
                  <input
                    type = "password"
                    className = "input_box"
                    id = "password"
                    value={password}
                    onChange={onChangePassword}
                  />
  
                  <h1 style={{color: "red"}}>{message}</h1>
                  {showButton ? 
                    (
                        <>
                        <button className='input_submit'  onClick={AttemptLoginF}> Login </button>
                        <button className='input_submit'  onClick={RegisterF}> Register </button>
                        </>
                    )
                    :
                    (<></>)
                }
                 
              </form>
              )
          )}
        </div>
    ) 
}