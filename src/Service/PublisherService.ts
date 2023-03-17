import { Publisher } from "../Assests/Book/Publisher"

export const PostPublisher = (url: string, body: any) => {

    var request = fetch("/Publisher",  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
      })

    return request
}

export const GetPublishersWithID = () => {

  var request = fetch("/Publisher/get-all/",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetPublishersWithIDByName = (str: string) => {

  var request = fetch("/Publisher/get-all-by-name/"+ str,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetPublisherByName = (url: string, str: string) => {

  var request = fetch("/Publisher/get-by-name/"+ str,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetPublisherNames = () => {

  var request = fetch("/Publisher/names/",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetPublisherByID = (id : string) => {
  var request = fetch("/Publisher/get-with-id/"+ id,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }
    })

  return request
}

export const DeletePublisher = (publisher : Publisher) => {
  var request = fetch("/Publisher/"+ publisher.id,  {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      }
    })

  return request
}

export const UpdatePublisher = (publisher : Publisher) => {
  var request = fetch("/Publisher/"+ publisher.id,  {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(publisher),
    })

  return request
}