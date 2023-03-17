import React from "react";
import '../../App.css';
import 'react-dropdown/style.css';
import { Author } from "../../Assests/Book/Author";
import {DeleteAuthor, GetAuthorByID, UpdateAuthor } from "../../Service/AuthorService";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Modal} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';

export default class UpdateOrDeleteAuthor extends React.Component<{}, { id: string, curr_author: Author, isLoaded: boolean, error: boolean, set: number, name: string, biography: string, website: string, err_text: string, show: boolean}>{
    
    constructor(props : any) {
        super(props);
        this.state = {
            id: props.id,
            curr_author: new Author(),
            isLoaded: false,
            error: false, 
            set: 0, 
            name: "",
            website: "",
            biography: "", 
            err_text: "",
            show: false
        };
        
        this.getAuthor(this.state.id);
    }
    
    getAuthor = async (id: string) => {
        await GetAuthorByID(id)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    this.setState({
                        isLoaded: true,
                        curr_author: results,
                        website: results.website,
                        biography: results.biography,
                        name: results.name
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

    onNameChange = async (e: any) => {
        this.setState({
            name: e.target.value
        });
    }

    onBiographyChange = async (e: any) => {
        this.setState({
            biography: e.target.value
        });
    }

    onWebsiteChange = async (e: any) => {
        this.setState({
            website: e.target.value
        });
    }

    onUpdate(e: any) {
        e.preventDefault();
        if(this.state.name === null ||  this.state.website === null || this.state.name.toString().trim().length === 0 || this.state.website.toString().trim().length === 0){
            this.setState({
                set: 2,
                err_text: "Please control your inputs!"
            });
        }
        else{
            UpdateAuthor({
                //Author object
                id: this.state.curr_author.id, name:this.state.name, website: this.state.website, biography: this.state.biography
            })
            .then(
                (res: any) => {
                    var code = res.status;
                    res = res.json();
                    if(code === 200){
                        this.setState({
                            set: 1,
                            website: "",
                            curr_author: new Author(),
                            name: ""
                        });
                    }
                    else{
                        this.setState({
                            set: 2,
                            err_text: "Please control your connection and website input!"
                        });
                    }
                } 
            )
            .catch((error: any) => {
                this.setState({
                    set: 2
                });
                console.log(error);
            });
        }
    }

    onDelete() {
        DeleteAuthor(this.state.curr_author)
        .then(
            (res: any) => {
                var code = res.status;
                res = res.json();
                if(code === 200){
                    this.setState({
                        set: 1,
                        website: "",
                        curr_author: new Author(),
                        name: ""
                    });
                }
                else{
                    this.setState({
                        set: 2,
                        err_text: "Please control your connection and inputs!"
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

    CallModal(e : any) {
        e.preventDefault();
        this.setState({
            show: !this.state.show 
        });
    }

    handleModal(e: any, _bool: boolean) {
        e.preventDefault();
        if(_bool){
            this.onDelete();
            console.log("Removed ", this.state.curr_author.website);
        }
        else{
            window.alert("Cancelled!")
        }
        this.setState({
            show: !this.state.show 
        });
    }

    render() {
        return (
            <div>
                {this.state.set === 1 ? (
                <div style={{backgroundColor: '#000080'}}>
                    <h4 style={{color: "white"}}>You updated/deleted successfully!</h4>
                    <button className='input_submit' onClick={()=>this.setState({set: 0})}> Ok </button>
                </div>
                ) : (
                <form className='inputAdminEdit'>
                    {this.state.set === 2 ? (<Popup contentStyle={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}
                            trigger={<button style={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}>
                                    Error! Cannot delete or update this author.
                                </button>} position="right center">
                            <div>{this.state.err_text}</div>
                        </Popup>)
                        :(<div></div>)
                    }
                    <div className="input_card">
                        <h1 style={{color: 'white'}}>Update/Delete Author</h1>

                        <div>
                            <label className="white_label"><b>Name</b></label>
                            <input
                                type="text"
                                className="input_box"
                                placeholder={this.state.curr_author.name? this.state.curr_author.name : "Please add a name!"}
                                onChange={this.onNameChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Website</b></label>
                            <input
                                type="text"
                                className="input_box"
                                placeholder={this.state.curr_author.website ? this.state.curr_author.website : "Please add author's website"}
                                onChange={this.onWebsiteChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Biography</b></label>
                            <input
                                type="text"
                                height={"auto"}
                                className="input_box"
                                placeholder={this.state.curr_author.biography? this.state.curr_author.biography : "Please add a biography"}
                                onChange={this.onBiographyChange}
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
                    <Modal.Header key={16} style={{color: "#000080", fontWeight:"bolder"}}>Delete this author?</Modal.Header>
                    <Modal.Body>
                        <Button key={17} className="modalButtonCancel3" onClick={(e) => this.handleModal(e, false)}>No</Button>
                        <Button key={18} className="modalButtonOk3" onClick={(e) => this.handleModal(e, true)}>Yes</Button>
                    </Modal.Body>
                </Modal>
            </div>
            );
    }
}