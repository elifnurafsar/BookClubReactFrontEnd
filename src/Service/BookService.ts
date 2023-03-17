import { Book } from "../Assests/Book/Book"

export const GetRecent = () => {

  var request = fetch("/Book/recent",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const PostBook = (body: Book) => {
    var request = fetch("/Book",  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
      })

    return request
}

export const GetBook = (isbn: string) => {

  var request = fetch("/Book/"+ isbn,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetBooksInMyBasket = (ISBNs: string) => {

  var request = fetch("/Book/get-myBasket/"+ ISBNs,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetBookByTitleOrType = (title_or_type: string) => {

  var request = fetch("/Book/get-by-title-or-type/"+ title_or_type,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetBookByISBN = (isbn: string) => {

  var request = fetch("/Book/"+ isbn,  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const UpdateBook = (book : Book) => {
  var request = fetch("/Book/"+ book.isbn,  {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(book),
    })

  return request
}

export const DeleteBook = (isbn: string) => {

  var request = fetch("/Book/"+ isbn,  {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}