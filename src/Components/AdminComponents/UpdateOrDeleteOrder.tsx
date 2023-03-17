import React from "react" 
import '../../App.css' 
import 'react-dropdown/style.css' 
import { Order } from "../../Assests/OTHER/Order" 
import { DeleteOrder, UpdateOrder, GetOrderByID } from "../../Service/OTHER/OrderService" 
import Popup from 'reactjs-popup' 
import 'reactjs-popup/dist/index.css' 
import {Modal} from 'react-bootstrap'  
import Button from 'react-bootstrap/Button' 

export default class UpdateOrDeleteOrder extends React.Component<{}, { id: string, currOrder: Order, isLoaded: boolean, error: boolean, set: number, isbn: string, username: string, phone: string, count: number, address: string, checkval: boolean, areacode: number, err_text: string, show: boolean}>{
    
    constructor(props : any) {
        super(props) 
        this.state = {
            id: props.id,
            currOrder: new Order(),
            isLoaded: false,
            error: false, 
            set: 0, 
            username: "",
            isbn: "",
            address: "",
            phone: "", 
            checkval: false,
            areacode: 0,
            err_text: "",
            count: 0,
            show: false
        } 
        
        this.getOrder(this.state.id) 
    }
    
    getOrder = async (id: string) => {
        await GetOrderByID(id)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    this.setState({
                        isLoaded: true,
                        currOrder: results,
                        username: results.username,
                        isbn: results.isbn,
                        address: results.address,
                        phone: results.phone, 
                        checkval: results.checkval,
                        areacode: results.areacode,
                        err_text: ""
                    }) 
                },
                (error) => {
                    //bc even with the errors the page is loaded and we should inform visitors instead of keep them waiting
                    this.setState({
                        isLoaded: false,
                        err_text: "Error occurred on uploading process."
                    }) 
                }
            )
    }

    async onUpdate(e: any) {
        e.preventDefault()
        await UpdateOrder({
            //Order object
            id: this.state.currOrder.id, username:this.state.username, isbn: this.state.isbn, address: this.state.address, 
            phone: this.state.phone, areacode: this.state.areacode, checkval: !this.state.checkval
        })
        .then(
            (res: any) => {
                var code = res.status
                if(code === 200){
                    this.setState({
                        set: 1,
                        currOrder: new Order(),
                        username: "",
                        isbn: "",
                        address: "",
                        phone: "", 
                        checkval: false,
                        areacode: 0,
                        err_text: ""
                    }) 
                }
                else{
                    this.setState({
                        set: 2,
                        err_text: "Please control your connection and inputs!"
                    }) 
                }
            } 
        )
        .catch((error: any) => {
            this.setState({
                set: 2
            }) 
            console.log(error) 
        }) 
    }

    onDelete () {
        let param: string = this.state.currOrder.id || ""
        DeleteOrder(param)
        .then(
            (res: any) => {
                var code = res.status 
                if(code === 200){
                    this.setState({
                        set: 1,
                        currOrder: new Order(),
                        username: "",
                        isbn: "",
                        address: "",
                        phone: "", 
                        checkval: false,
                        areacode: 0,
                        err_text: ""
                    }) 
                }
                else{
                    this.setState({
                        set: 2,
                        err_text: "Cannot delete an order which is not submitted!"
                    }) 
                }
            } 
        )
        .catch((error) => {
            this.setState({
                set: 2,
                err_text: "Cannot delete this order. Try again!"
            })  
            console.log( error) 
        })
    }

    CallModal(e : any) {
        e.preventDefault() 
        this.setState({
            show: !this.state.show 
        }) 
    }

    handleModal(e: any, _bool: boolean) {
        e.preventDefault() 
        if(_bool){
            this.onDelete() 
        }
        else{
            window.alert("Cancelled!")
        }
        this.setState({
            show: !this.state.show 
        }) 
    }

    render() {
        return (
            <div key={0}>
                {this.state.set === 1 ? (
                <div key={1} style={{backgroundColor: '#000080'}}>
                    <h4 key={2} style={{color: "white"}}>You updated/deleted successfully!</h4>
                    <button key={3} className='input_submit' onClick={()=>this.setState({set: 0})}> Ok </button>
                </div>
                ) : (
                <form key={4} className='inputAdminEdit'>
                    {this.state.set === 2 ? (<Popup key={5} contentStyle={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}
                            trigger={<button style={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}>
                                    Error! Cannot delete or update this Order.
                                </button>} position="right center">
                            <div>{this.state.err_text}</div>
                        </Popup>)
                        :(<div></div>)
                    }
                    <div key={6} className="input_card">
                        <h1 key={7} style={{color: 'white'}}>Update/Delete Order</h1>

                        <div key={8}>
                            <label key={9} className="white_label"><b>User: {this.state.currOrder.username}</b></label>
                        </div>

                        <div key={10}>
                            <label key={11} className="white_label"><b>ISBN: {this.state.currOrder.isbn}</b></label>
                        </div>

                        <div key={12}>
                            <label key={13} className="white_label"><b>Address: {this.state.currOrder.address}</b></label>
                        </div>

                        <div>
                            <label key={14} className="white_label"><b>Phone: {this.state.currOrder.phone}</b></label>
                        </div>

                        <div key={15} className='rowC'>
                            <button key={16} className='input_submit' style={{ width: "50%"}} onClick={(e: any)=>(this.onUpdate(e))}> Check </button>
                            <button key={17} className='input_cancel' style={{ width: "50%"}} onClick={(e: any)=>(this.CallModal(e))}> Delete </button>
                        </div>
                        
                    </div>
                </form>
                )}
                <Modal key={18} className="modalClass2" show={this.state.show}>
                    <Modal.Header key={19} style={{color: "#000080", fontWeight:"bolder"}}>Delete this Order?</Modal.Header>
                    <Modal.Body key={20}>
                        <Button key={21} className="modalButtonCancel3" onClick={(e) => this.handleModal(e, false)}>No</Button>
                        <Button key={22} className="modalButtonOk3" onClick={(e) => this.handleModal(e, true)}>Yes</Button>
                    </Modal.Body>
                </Modal>
            </div>
            ) 
    }
}