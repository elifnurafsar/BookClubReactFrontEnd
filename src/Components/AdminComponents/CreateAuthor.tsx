import React, { Component } from "react";
import {Author} from '../../Assests/Book/Author';
import '../../App.css';
import { PostAuthor } from "../../Service/AuthorService";
import queen from "../../images/queen.svg"

export default class CreateAuthor extends React.Component<{}, {name: string, website: string, biography: string, added: boolean}>{
  
    constructor(props : Author) {
        super(props);
        this.onChangeName= this.onChangeName.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeBiography = this.onChangeBiography.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.newAuthor = this.newAuthor.bind(this);
        this.added = this.added.bind(this);
    
        this.state = {
          name: "",
          website: "",
          biography: "",
          added: false,
        };
    }
    
  onChangeName(e:any) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }

  added(e:any) {
    e.preventDefault();
    this.setState({
      added: !this.added,
    });
  }

  onChangeWebsite(e:any) {
    e.preventDefault();
    this.setState({
      website: e.target.value
    });
  }

  onChangeBiography(e:any) {
    e.preventDefault();
    this.setState({
      biography: e.target.value
    });
  }

  saveAuthor(e: any) {
    e.preventDefault();
    
    PostAuthor({
          name: this.state.name, 
          website : this.state.website,
          biography: this.state.biography
      })
    .then((res) => {
      
      if(res.status === 200){
        this.setState({
          added: true,
        });
      }
    })
    .catch((err) => console.log(err))

    console.log("Added successfully", this.state.added);

    this.newAuthor();
  }

  newAuthor() {
    this.setState({
      name: "",
      website: "",
      biography: ""
    });
  }

  render() {
    return (
      <div>
        {this.state.added ? (
          <div style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"auto", marginRight: "-20px", padding: "5%"}}>
            <img key={1} width={100} height={100} src={queen} alt="Queen image" />
            <h4 key={2} style={{color: "#000080"}}>Author added successfully!</h4>
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

            <label htmlFor="description" style={{color: '#ffd700'}}>Website</label>
            <input
              type="text"
              className="input_box"
              id="website"
              value={this.state.website}
              onChange={this.onChangeWebsite}
            />

            <label htmlFor="description" style={{color: '#ffd700'}}>Biography</label>
            <input
              type="text"
              className="input_box"
              id="biography"
              value={this.state.biography}
              onChange={this.onChangeBiography}
            />

            <button className='input_submit'  onClick={this.saveAuthor}> Create </button>
          </form>
        )}
      </div>
    );
  }
}