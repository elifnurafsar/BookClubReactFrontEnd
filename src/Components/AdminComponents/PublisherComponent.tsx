import React, { Component } from "react" 
import {Publisher} from '../../Assests/Book/Publisher' 
import '../../App.css' 
import { PostPublisher } from "../../Service/PublisherService" 
import queen from "../../images/queen.svg"

export default class AddPublisher extends React.Component<{}, {name: string, website: string, phone: string, address: string, added: boolean}>{
  
    constructor(props : Publisher) {
        super(props) 
        this.onChangeName= this.onChangeName.bind(this) 
        this.onChangePhone = this.onChangePhone.bind(this) 
        this.onChangeWebsite = this.onChangeWebsite.bind(this) 
        this.onChangeAddress = this.onChangeAddress.bind(this) 
        this.savePublisher = this.savePublisher.bind(this) 
        this.newPublisher = this.newPublisher.bind(this) 
        this.added = this.added.bind(this) 
    
        this.state = {
          name: "",
          website: "",
          phone: "", 
          address: "",
          added: false,
        } 
    }
    
  onChangeName(e:any) {
    e.preventDefault() 
    this.setState({
      name: e.target.value
    }) 
  }

  added(e:any) {
    e.preventDefault() 
    this.setState({
      added: !this.added,
    }) 
  }

  onChangePhone(e:any) {
    e.preventDefault() 
    this.setState({
      phone: e.target.value
    }) 
  }

  onChangeWebsite(e:any) {
    e.preventDefault() 
    this.setState({
      website: e.target.value
    }) 
  }

  onChangeAddress(e:any) {
    e.preventDefault() 
    this.setState({
      address: e.target.value
    }) 
  }

  savePublisher(e: any) {
    e.preventDefault() 
    
    PostPublisher("/Publisher", {
          name: this.state.name, 
          website : this.state.website,
          phone : this.state.phone,
          address : this.state.address,
      })
    .then(res => {
        if(res.status === 200){
          this.setState({
            added: true,
          }) 
        }}
      )
    .catch((err) => console.log(err))
    
    this.newPublisher() 
  }

  newPublisher() {
    this.setState({
      name: "",
      phone: "",
      website: "",
      address: "",
    }) 
  }

  render() {
    return (
      <div>
        {this.state.added ? (
          <div style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"auto", marginRight: "-20px", padding: "5%"}}>
            <img key={1} width={100} height={100} src={queen} alt="Queen image" />
            <h4 key={2} style={{color: "#000080"}}>Publisher added successfully!</h4>
            <p key={3}>{this.state.name}</p>
            <button key={4} className='input_submit'  onClick={this.added}> Ok </button>
          </div>
        ) : (
           <form className='input'>

            <label htmlFor="title" style={{color: '#ffd700'}}>Name</label>
            <input
              type="text"
              className="input_box"
              id="title"
              value={this.state.name}
              onChange={this.onChangeName}
            />
            
            <label htmlFor="description" style={{color: '#ffd700'}}>Phone</label>
            <input
              type="text"
              className="input_box"
              id="phone"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />

            <label htmlFor="description" style={{color: '#ffd700'}}>Website</label>
            <input
              type="text"
              className="input_box"
              id="website"
              value={this.state.website}
              onChange={this.onChangeWebsite}
            />

            <label htmlFor="description" style={{color: '#ffd700'}}>Address</label>
            <input
              type="text"
              className="input_box"
              id="address"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />

            <button className='input_submit'  onClick={this.savePublisher}> Create </button>
          </form>
        )}
      </div>
    ) 
  }
}