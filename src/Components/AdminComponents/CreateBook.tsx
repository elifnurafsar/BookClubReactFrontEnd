import React from "react" 
import '../../App.css' 
import 'react-dropdown/style.css' 
import { GetAuthorNames } from "../../Service/AuthorService" 
import { GetPublisherNames } from "../../Service/PublisherService" 
import { Book } from "../../Assests/Book/Book" 
import { PostBook } from "../../Service/BookService" 
import Popup from 'reactjs-popup' 
import 'reactjs-popup/dist/index.css' 
import book from "../../images/book2.svg"

export default class CreateBook extends React.Component<{}, { isLoaded: boolean, error: boolean, authors: string[], publishers: string[], type_vals: string[], set: number, isbn: number, title: string, author: string, publisher: string, genre: string, year: number, price: number, typeval: string, description: string, err_text: string, this_year: number}>{
    
    constructor(props : Book) {
        super(props) 

        this.state = {
          isLoaded: false,
          error: false, 
          authors: [],
          publishers: [],
          type_vals: ["Text Book", "Novel", "Story Book"],
          set: 0, 
          isbn: 0,
          title: '', 
          author: '', 
          publisher: '', 
          genre: '', 
          year: 0, 
          price: 0, 
          typeval: "",
          description: "",
          err_text: "",
          this_year: 2023
        } 

       this.refresh() 
    
    }
    
    getAuthors= async () => {
        await GetAuthorNames()
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    this.setState({
                        isLoaded: true,
                        authors: results
                    }) 
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    this.setState({
                        isLoaded: false
                    }) 
                }
            )
    }

    getPublishers= async () => {
        await GetPublisherNames()
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    this.setState({
                        isLoaded: true,
                        publishers: results
                    }) 
                },
                (error) => {
                    this.setState({
                        isLoaded: false
                    }) 
                }
            )
    }

    refresh = async () => {
        this.setState({
            this_year: new Date().getFullYear()
        }) 
        await this.getAuthors() 
        await this.getPublishers() 
    }

    onAuthorChange = async (e: any) => {
        this.setState({
            author: e.target.value
        }) 
        console.log("User Selected Author Value - ", e.target.value)
    }

    onPublisherChange = async (e: any) => {
        this.setState({
            publisher: e.target.value
        }) 
        console.log("User Selected Publisher Value - ", e.target.value)
    }

    onPriceChange = async (e: any) => {
        this.setState({
            price: e.target.value
        }) 
    }

    onISBNChange = async (e: any) => {
        this.setState({
            isbn: e.target.value
        }) 
    }

    onTitleChange = async (e: any) => {
        this.setState({
            title: e.target.value
        }) 
    }

    onGenreChange = async (e: any) => {
        this.setState({
            genre: e.target.value
        }) 
    }

    onYearChange = async (e: any) => {
        this.setState({
            year: e.target.value
        }) 
    }

    onTypeValChange = async (e: any) => {
        this.setState({
            typeval: e.target.value
        }) 
        console.log("User Selected Type Value - ", e.target.value)
    }
        
    onDescriptionChange = async (e: any) => {
        this.setState({
            description: e.target.value
        }) 
    }

    onSave(e: any) {
        e.preventDefault() 

        /*let book: Book = ({isbn:this.state.isbn, title:this.state.title, author:this.state.author, publisher:this.state.publisher, genre:this.state.genre, year:this.state.year, price:this.state.price, type: "", description: ""})
        console.log(book) */

        if(this.state.isbn.toString().length < 14 || this.state.isbn.toString().length > 14 || this.state.year < 100 || this.state.year > this.state.this_year || this.state.price < 1 || this.state.publisher === null || this.state.publisher.indexOf("Please") >= 0 || this.state.author === null || this.state.author.indexOf("Please") >= 0 || this.state.typeval === null || this.state.typeval.indexOf("Please") >= 0){
            this.setState({
                set: 2,
                err_text: "Please control your inputs!"
            }) 
        }
        else{
            PostBook({
                //Book object
                isbn:this.state.isbn, title:this.state.title, author:this.state.author, publisher:this.state.publisher, genre:this.state.genre, year:this.state.year, price:this.state.price, type: this.state.typeval, description: this.state.description
            })
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res)
                    if(res === true){
                        this.setState({
                            set: 1
                        }) 
                    }
                    else{
                        this.setState({
                            set: 2,
                            err_text: "Please control your connection and isbn number!"
                        }) 
                    }
                } 
            )
            .catch((error) => {
                this.setState({
                    set: 2
                }) 
                console.log( error) 
            }) 
        }
        
    }

    async onChangeSet() {
        this.setState({
            set: 0 
        }) 
    }

    render() {

        if(!this.state.isLoaded){
            return (
                <div className="container">
                <button className='input_submit' type='submit' onClick={()=>(this.refresh())}> Refresh </button>
                </div>
            ) 
        }
        else {
        return (
            <div>
                {this.state.set === 1 ? (
                     <div className="container6">
                     <img key={1} width={100} height={100} src={book} alt="Leprechaun image" />
                     <h3 key={2} style={{color: '#cfcfe6'}} >You submitted successfully!</h3>
                     <button className='input_submit' onClick={()=>(this.onChangeSet())}> Ok </button>
                 </div>
                ) : (
                <form className='input'>
                    {this.state.set === 2 ? (<Popup contentStyle={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}
                            trigger={<button style={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}>
                                    Error! Cannot add this book.
                                </button>} position="right center">
                            <div>{this.state.err_text}</div>
                        </Popup>)
                        :(<div></div>)
                    }
                    <div className="input_card">
                        <h1 style={{color: 'white'}}>Create Book</h1>
                        <div>
                            <label className="white_label"><b>ISBN</b></label>
                            <input
                                type="text"
                                className="input_box"
                                minLength={14} 
                                maxLength={14} 
                                size= {14}
                                placeholder="00000000000000"
                                onChange={this.onISBNChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Title</b></label>
                            <input
                                type="text"
                                className="input_box"
                                placeholder={this.state.title.toString()}
                                onChange={this.onTitleChange}
                            />
                        </div>

                        <div className='rowC'>
                            <select className='input_selectBox' onChange={this.onAuthorChange}>
                                <option>Please select an author</option>
                                {this.state.authors.map((option, index) => {
                                    return <option key={index} style={{backgroundColor: '#f9f9f9', borderRadius: '10%', position: 'absolute' }}>
                                        {option}
                                    </option>
                                })}
                            </select> 

                            <select className='input_selectBox' onChange={this.onPublisherChange}>
                                <option>Please select a publisher</option>
                                {this.state.publishers.map((option, index) => {
                                    return <option key={index} style={{backgroundColor: '#f9f9f9', borderRadius: '10%', position: 'absolute' }}>
                                        {option}
                                    </option>
                                })}
                            </select> 
                        </div>

                        <div className='rowC'>
                            <div>
                                <label className="white_label"><b>Genre</b></label>
                                <input
                                    type="text"
                                    className="input_box"
                                    placeholder={this.state.genre.toString()}
                                    onChange={this.onGenreChange}
                                />
                            </div>

                            <select className='input_selectBox' onChange={this.onTypeValChange}>
                                <option>Please select type</option>
                                {this.state.type_vals.map((option, index) => {
                                    return <option key={index} style={{backgroundColor: '#f9f9f9', borderRadius: '10%', position: 'absolute' }}>
                                        {option}
                                    </option>
                                })}
                            </select>
                        </div>
                        
                        <div>
                            <label className="white_label"><b>Year</b></label>
                            <input
                                type="number" 
                                min="100"
                                max={this.state.this_year}
                                className="input_box"
                                placeholder={this.state.year.toString()}
                                onChange={this.onYearChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Price (Please use . symbol for fractions)</b></label>
                            <input
                                type="decimal"
                                min="1"
                                step="0.01"
                                className="input_box"
                                placeholder={this.state.price.toString()}
                                onChange={this.onPriceChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Description</b></label>
                            <input
                                type="text" 
                                min="100"
                                max={this.state.description}
                                className="input_box"
                                placeholder={this.state.description.toString()}
                                onChange={this.onDescriptionChange}
                            />
                        </div>

                        <button className='input_submit' onClick={(e)=>(this.onSave(e))}> Create </button>
                    </div>
                </form>
                )}
            </div>
            ) 
        }
    }
}