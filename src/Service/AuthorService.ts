import { Author } from "../Assests/Book/Author"

export const PostAuthor = (body: any) => {

    var request = fetch("/Author",  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
      })

    return request
}

export const GetAuthorByName = (str: string) => {

  var request = fetch("/Author/get-by-name/"+ str,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetAuthorNames = () => {

  var request = fetch("/Author/names/",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const UpdateAuthor = (author : Author) => {
  var request = fetch("/Author/"+ author.id,  {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(author),
    })

  return request
}

export const DeleteAuthor = (author : Author) => {
  var request = fetch("/Author/"+ author.id,  {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      }
    })

  return request
}

export const GetAuthorsWithID = () => {
  var request = fetch("/Author/get-with-id",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }
    })

  return request
}

export const SearchAuthorsWithID = (name : string) => {
  var request = fetch("/Author/search-by-name/"+ name,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }
    })

  return request
}

export const GetAuthorByID = (id : string) => {
  var request = fetch("/Author/"+ id,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }
    })

  return request
}