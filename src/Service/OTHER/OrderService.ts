import { Order } from "../../Assests/OTHER/Order"


export const GetOrders = () => {

    var request = fetch("/Order",  {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
        }
    })

    return request
}

export const GetOrderByID = (id: string) => {

    var request = fetch("/Order/" + id,  {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
        }
    })

    return request
}

export const GetOrdersByUsername = (username: string) => {

    var request = fetch("/Order/get-by-e_mail/" + username,  {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
        }
    })

    return request
}
  
export const CreateOrder = (body : Order) => {

    var request = fetch("/Order",  {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(body)
    })

    return request
}

export const DeleteOrder = (id : String) => {

    var request = fetch("/Order/" + id,  {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
        }
    })

    return request
}
 

export const UpdateOrder = (_body: any) => {

    var request = fetch("/Order/set-check/" + _body.id,  {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(_body.checkval),
    })

    return request
}
  