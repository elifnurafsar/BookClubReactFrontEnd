/*import { Discount } from "../../Assests/OTHER/Discount";
import http from "../../http-common";
class DiscountService {
   
    setDiscount(data : Discount) {
      return http.post("/Discount", data);
    }

    getDiscount() {
        return http.get("/Discount");
    }
  
  }
  
  export default new DiscountService();*/

import { Discount } from "../../Assests/OTHER/Discount"

export const GetNovelDiscount = () => {

  var request = fetch("/Discount/novel/",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetStoryBookDiscount = () => {

  var request = fetch("/Discount/story-book/",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const GetTextBookDiscount = () => {

  var request = fetch("/Discount/text-book/",  {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    })

  return request
}

export const setDiscount = (body : Discount) => {

  var request = fetch("/Discount",  {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(body),
    })

  return request
}

