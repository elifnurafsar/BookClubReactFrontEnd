import React from "react";
import '../../App.css';
import 'react-dropdown/style.css';
import { Publisher } from "../../Assests/Book/Publisher";
import {DeletePublisher, GetPublisherByID, UpdatePublisher } from "../../Service/PublisherService";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Modal} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';

export default class UpdateOrDeletePublisher extends React.Component<{}, { id: string, curr_publisher: Publisher, isLoaded: boolean, error: boolean, set: number, name: string, phone: string, website: string, address: string, err_text: string, show: boolean}>{
    
    constructor(props : any) {
        super(props);
        this.state = {
            id: props.id,
            curr_publisher: new Publisher(),
            isLoaded: false,
            error: false, 
            set: 0, 
            name: "",
            website: "",
            phone: "", 
            address: "",
            err_text: "",
            show: false
        };
        
        this.getPublisher(this.state.id);
    }
    
    getPublisher = async (id: string) => {
        await GetPublisherByID(id)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    this.setState({
                        isLoaded: true,
                        curr_publisher: results,
                        website: results.website,
                        phone: results.phone,
                        address: results.address,
                        name: results.name,
                        error: false
                    });
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    this.setState({
                        isLoaded: false,
                        error: true,
                        set: 2,
                        err_text: "Cannot get the publisher with ID: "+ id + ". Please go back and try again."
                    });
                }
            )
    }

    onNameChange = async (e: any) => {
        this.setState({
            name: e.target.value
        });
    }

    onPhoneChange = async (e: any) => {
        this.setState({
            phone: e.target.value
        });
    }

    onAddressChange = async (e: any) => {
        this.setState({
            address: e.target.value
        });
    }

    onWebsiteChange = async (e: any) => {
        this.setState({
            website: e.target.value
        });
    }

    onUpdate(e: any) {
        e.preventDefault();
        if(this.state.name === null ||  this.state.website === null || this.state.phone === null || this.state.address === null || this.state.name.toString().trim().length === 0 || this.state.website.toString().trim().length === 0 || this.state.phone.toString().trim().length === 0 || this.state.address.toString().trim().length === 0){
            this.setState({
                set: 2,
                err_text: "Please control your inputs!"
            });
        }
        else{
            UpdatePublisher({
                //Publisher object
                id: this.state.curr_publisher.id, name:this.state.name, website: this.state.website, phone: this.state.phone, address: this.state.address
            })
            .then(
                (res: any) => {
                    var code = res.status;
                    res = res.json();
                    if(code === 200){
                        this.setState({
                            set: 1,
                            website: "",
                            curr_publisher: new Publisher(),
                            name: "",
                            phone: "",
                            address: "",
                            error: false
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
            .catch((error: any) => {
                this.setState({
                    set: 2
                });
                console.log(error);
            });
        }
    }

    onDelete() {
        DeletePublisher(this.state.curr_publisher)
        .then(
            (res: any) => {
                var code = res.status;
                res = res.json();
                if(code === 200){
                    this.setState({
                        set: 1,
                        website: "",
                        curr_publisher: new Publisher(),
                        name: "",
                        phone: "",
                        address: "",
                        err_text: ""
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
            console.log("Removed ", this.state.curr_publisher.website);
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
                                    Error! Cannot delete or update this publisher.
                                </button>} position="right center">
                            <div>{this.state.err_text}</div>
                        </Popup>)
                        :(<div></div>)
                    }
                    <div className="input_card">
                        <h1 style={{color: 'white'}}>Update/Delete Publisher</h1>

                        <div>
                            <label className="white_label"><b>Name</b></label>
                            <input
                                type="text"
                                className="input_box"
                                placeholder={this.state.curr_publisher.name? this.state.curr_publisher.name : "Please add a name"}
                                onChange={this.onNameChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Website</b></label>
                            <input
                                type="text"
                                className="input_box"
                                placeholder={this.state.curr_publisher.website ? this.state.curr_publisher.website : "Please add publisher's website"}
                                onChange={this.onWebsiteChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Phone Number</b></label>
                            <input
                                type="text"
                                height={"auto"}
                                className="input_box"
                                placeholder={this.state.curr_publisher.phone? this.state.curr_publisher.phone : "Please add a phone number!"}
                                onChange={this.onPhoneChange}
                            />
                        </div>

                        <div>
                            <label className="white_label"><b>Address</b></label>
                            <input
                                type="text"
                                height={"auto"}
                                className="input_box"
                                placeholder={this.state.curr_publisher.address? this.state.curr_publisher.address : "Please add location info!"}
                                onChange={this.onAddressChange}
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
                    <Modal.Header key={16} style={{color: "#000080", fontWeight:"bolder"}}>Delete this publisher?</Modal.Header>
                    <Modal.Body>
                        <Button key={17} className="modalButtonCancel3" onClick={(e) => this.handleModal(e, false)}>No</Button>
                        <Button key={18} className="modalButtonOk3" onClick={(e) => this.handleModal(e, true)}>Yes</Button>
                    </Modal.Body>
                </Modal>
            </div>
            );
    }
}