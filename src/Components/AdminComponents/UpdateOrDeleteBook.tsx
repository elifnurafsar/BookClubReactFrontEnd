import React from "react";
import '../../App.css';
import 'react-dropdown/style.css';
import { GetAuthorNames } from "../../Service/AuthorService";
import { GetPublisherNames } from "../../Service/PublisherService";
import { Book } from "../../Assests/Book/Book";
import { UpdateBook, DeleteBook, GetBookByISBN } from "../../Service/BookService";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Modal} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';

export default class UpdateOrDeleteBook extends React.Component<{}, { curr_book: Book, isLoaded: boolean, error: boolean, authors: string[], publishers: string[], type_vals: string[], set: number, isbn: number, title: string, author: string, publisher: string, genre: string, year: number, price: number, typeval: string, description: string, err_text: string, this_year: number, show: boolean}>{
    
    constructor(props : Book) {
        super(props);

        this.state = {
            curr_book: new Book(),
            isLoaded: false,
            error: false, 
            authors: [],
            publishers: [],
            type_vals: ["Classics", "Novel", "Story Book"],
            set: 0, 
            isbn: 0,
            title: "", 
            author: "", 
            publisher: "", 
            genre: "", 
            year: 0, 
            price: 0, 
            typeval: "",
            description: "",
            err_text: "",
            this_year: 2023,
            show: false
        };

       this.refresh();
    
    }
    
    getBook= async (isbn: string) => {
        console.log("ISBN: ", isbn);
        await GetBookByISBN( isbn)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    console.log("Results: ", results);
                    this.setState({
                        isLoaded: true,
                        curr_book: results,
                        author: results.author,
                        publisher: results.publisher,
                        title: results.title,
                        genre: results.genre,
                        typeval: results.type,
                        year: results.year,
                        price: results.price,
                        description: results.description
                    });
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    this.setState({
                        isLoaded: false
                    });
                }
            )
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
                    });
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    this.setState({
                        isLoaded: false
                    });
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
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false
                    });
                }
            )
    }

    refresh = async () => {
        this.setState({
            this_year: new Date().getFullYear()
        });
        await this.getAuthors();
        await this.getPublishers();
    }

    onAuthorChange = async (e: any) => {
        this.setState({
            author: e.target.value
        });
        console.log("User Selected Author Value - ", e.target.value)
    }

    onPublisherChange = async (e: any) => {
        this.setState({
            publisher: e.target.value
        });
        console.log("User Selected Publisher Value - ", e.target.value)
    }

    onPriceChange = async (e: any) => {
        this.setState({
            price: e.target.value
        });
    }

    onISBNChange = async (e: any) => {
        this.setState({
            isbn: e.target.value
        });
        if(e.target.value.length===14){
            this.getBook(e.target.value.toString());
        }
    }

    onTitleChange = async (e: any) => {
        this.setState({
            title: e.target.value
        });
    }

    onGenreChange = async (e: any) => {
        this.setState({
            genre: e.target.value
        });
    }

    onYearChange = async (e: any) => {
        this.setState({
            year: e.target.value
        });
    }

    onTypeValChange = async (e: any) => {
        this.setState({
            typeval: e.target.value
        });
        console.log("User Selected Type Value - ", e.target.value)
    }
        
    onDescriptionChange = async (e: any) => {
        this.setState({
            description: e.target.value
        });
    }

    onUpdate(e: any) {
        e.preventDefault();
        if(this.state.isbn.toString().length < 14 || this.state.isbn.toString().length > 14 || this.state.year < 100 || this.state.year > this.state.this_year || this.state.price < 1 || this.state.publisher === null || this.state.publisher.indexOf("Please") >= 0 || this.state.author === null || this.state.author.indexOf("Please") >= 0 || this.state.typeval === null || this.state.typeval.indexOf("Please") >= 0){
            console.log("x");
            this.setState({
                set: 2,
                err_text: "Please control your inputs!"
            });
        }
        else{
            UpdateBook({
                //Book object
                isbn:this.state.isbn, title:this.state.title, author:this.state.author, publisher:this.state.publisher, genre:this.state.genre, year:this.state.year, price:this.state.price, type: this.state.typeval, description: this.state.description
            })
            .then(res => res.json())
            .then(
                (res) => {
                    if(res === true){
                        this.setState({
                            set: 1,
                            isbn: 0,
                            curr_book: new Book()
                        });
                    }
                    else{
                        this.setState({
                            set: 2,
                            err_text: "Please control your connection and isbn number!"
                        });
                    }
                } 
            )
            .catch((error) => {
                this.setState({
                    set: 2
                });
                console.log( error);
            });
        }
    }

    onDelete() {
        DeleteBook(this.state.isbn.toString())
        .then(res => res.json())
        .then(
            (res) => {
                console.log(res)
                if(res === true){
                    this.setState({
                        set: 1,
                        isbn: 0,
                        curr_book: new Book()
                    });
                }
                else{
                    this.setState({
                        set: 2,
                        err_text: "Please control your connection and isbn number!"
                    });
                }
            } 
        )
        .catch((error) => {
            this.setState({
                set: 2
            });
            console.log( error);
        });
    }

    async onChangeSet() {
        this.setState({
            set: 0 
        });
    }

    CallModal(e : any) {
        e.preventDefault();
        this.setState({
            show: !this.state.show 
        });
    }

    handleModal(e: any, _bool: boolean) {
        e.preventDefault();
        if(_bool && this.state.isbn.toString().length === 14){
            this.onDelete();
            console.log("Removed ", this.state.isbn);
        }
        else if(this.state.isbn.toString().length !== 14){
            window.alert("Cannot find the book with isbn: " + this.state.isbn + "!");
        }
        else{
            window.alert("Cancelled!")
        }
        this.setState({
            show: !this.state.show 
        });
    }

    render() {

        if(!this.state.isLoaded){
            return (
                <div className="container">
                    <button className='input_submit' type='submit' onClick={()=>(this.refresh())}> Refresh </button>
                </div>
            );
        }
        else {
        return (
            <div>
                {this.state.set === 1 ? (
                <div style={{backgroundColor: '#000080', height: "100vh", overflow:"auto", marginRight: "-20px",  width: "100%"}}>
                    <h4 style={{color: "white"}}>You updated/deleted successfully!</h4>
                    <button className='input_submit' onClick={()=>(this.onChangeSet())}> Ok </button>
                </div>
                ) : (
                <form className='input'>
                    {this.state.set === 2 ? (<Popup contentStyle={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}
                            trigger={<button style={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}>
                                    Error! Cannot delete or update this book.
                                </button>} position="right center">
                            <div>{this.state.err_text}</div>
                        </Popup>)
                        :(<div></div>)
                    }
                    <div className="input_card">
                        <h1 style={{color: 'white'}}>Update Book</h1>
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
                                placeholder={this.state.curr_book.title? this.state.curr_book.title : "Please add a title"}
                                onChange={this.onTitleChange}
                            />
                        </div>

                        <div className='rowC'>
                            <select className='input_selectBox' onChange={this.onAuthorChange}>
                                <option>{this.state.curr_book.author ? this.state.curr_book.author : "Author"}</option>
                                {this.state.authors.map((option, index) => {
                                    return <option key={index} style={{backgroundColor: '#f9f9f9', borderRadius: '10%', position: 'absolute' }}>
                                        {option}
                                    </option>
                                })}
                            </select> 

                            <select className='input_selectBox' onChange={this.onPublisherChange}>
                                <option>{this.state.curr_book.publisher ? this.state.curr_book.publisher : "Publisher"}</option>
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
                                    placeholder={this.state.curr_book.genre? this.state.curr_book.genre : "Please add a genre"}
                                    onChange={this.onGenreChange}
                                />
                            </div>

                            <select className='input_selectBox' onChange={this.onTypeValChange}>
                                <option>{this.state.curr_book.type ? this.state.curr_book.type : "Type"}</option>
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
                                max={this.state.this_year ? this.state.this_year : "Year"}
                                className="input_box"
                                placeholder={this.state.curr_book.year? this.state.curr_book.year.toString() : "Year"}
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
                                placeholder={this.state.curr_book.price? this.state.curr_book.price.toString() : "Price"}
                                onChange={this.onPriceChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Description</b></label>
                            <input
                                type="text" 
                                className="input_box"
                                placeholder={this.state.curr_book.description? this.state.curr_book.description : "Please add a description"}
                                onChange={this.onDescriptionChange}
                            />
                        </div>

                        <div className='rowC'>
                            <button className='input_submit' style={{ width: "50%"}} onClick={(e: any)=>(this.onUpdate(e))}> Update </button>
                            <button className='input_cancel' style={{ width: "50%"}} onClick={(e: any)=>(this.CallModal(e))}> Delete </button>
                        </div>
                        
                    </div>
                </form>
                )}
                <Modal key={15} className="modalClass2" show={this.state.show}>
                    <Modal.Header key={16} style={{color: "#000080", fontWeight:"bolder"}}>Delete this book?</Modal.Header>
                    <Modal.Body>
                        <Button key={17} className="modalButtonCancel3" onClick={(e) => this.handleModal(e, false)}>No</Button>
                        <Button key={18} className="modalButtonOk3" onClick={(e) => this.handleModal(e, true)}>Yes</Button>
                    </Modal.Body>
                </Modal>
            </div>
            );
        }
    }
}