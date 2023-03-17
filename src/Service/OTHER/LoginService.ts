import {User} from "../../Assests/OTHER/User";

export const AttemptLogin = (auth_token: any) => {

    console.log("Token: ", auth_token);
    var request = fetch("Auth/Login",  {
        method: "GET", 
        headers: { authorization: auth_token }
      })
  
    return request
}


export const AttemptLogout = () => {

    var request = fetch("Auth/Logout",  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        }
      })
  
    return request
}

export const Register = ( body: User) => {

    var request = fetch("/User",  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
      })
  
    return request
}
