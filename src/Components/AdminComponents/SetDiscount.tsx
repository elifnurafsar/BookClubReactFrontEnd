import React from "react";
import {Discount} from '../../Assests/OTHER/Discount';
import '../../App.css';
import { GetTextBookDiscount, GetStoryBookDiscount, GetNovelDiscount, setDiscount } from "../../Service/OTHER/DiscountService";
import 'react-dropdown/style.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import discount from "../../images/discount.svg"

export default class SetDiscount extends React.Component<{}, {type: string, discount: number, set: number, isLoaded: boolean, error: boolean, err_text: string}>{
    
    constructor(props : Discount) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.save = this.save.bind(this);
        this.getDiscount = this.getDiscount.bind(this);
        this.newDiscount = this.newDiscount.bind(this);

        this.state = {
          type: "Text Book",
          discount: 0,
          set: 0,
          isLoaded: false,
          error: false,
          err_text: ""
        };

        /** 
         * set = 0 : default false
         * set = 1 : true
         * set = 2 : error false
        */

        this.getDiscount();
    }
    
    getDiscount = () => {
        if(this.state.type === "Novel"){
            GetNovelDiscount()
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        discount: results,
                        error: false
                    });
                },
                (error) => {
                    this.setState({
                        error: true
                    });
                }
            )
        }
        else if(this.state.type === "Text Book"){
            GetTextBookDiscount()
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        discount: results,
                        error: false
                    }); 
                },
                (error) => {
                    this.setState({
                        error: true
                    });
                }
            )
        }
        else if(this.state.type === "Story Book"){
            GetStoryBookDiscount()
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        discount: results,
                        error: false
                    });
                },
                (error) => {
                    this.setState({
                        error: true
                    });
                }
            )
        }
        else
            console.log("Book type cannot resolved.") 
    }

    async onChangeType(e: string) {
        
        await this.setState({
            type: e
        });

        this.getDiscount();
 
    }

    onChangeDiscount(e:any) {
        e.preventDefault();
        this.setState({
            discount: e.target.value
        });
    }
    
    async newDiscount() {
        
        await this.setState({
            set: 0
        });
 
    }

    save(e: any) {
        e.preventDefault();
        if(this.state.discount >= 100){
            this.setState({
                set: 2,
                err_text: "Discount value cannot be higher than 99%"
            });
        }
        else{
            let discountObj: Discount = new Discount({type: this.state.type, discount: this.state.discount})

            setDiscount(discountObj)
            .then(
                (res) => {
                    if(res.ok){
                        this.setState({
                            set: 1
                        });
                        console.log(this.state.type, " discount updated successfully ", this.state.set, "!");
                    }
                    else{
                        this.setState({
                            set: 2,
                            err_text: "Cannot update " + this.state.type + " discount! "
                        });
                    }
                }
            )
            .finally(
                
                () =>
                {
                    this.getDiscount();
                }

            ); 
        }
    }


    render() {
        return (
        <div>
            {this.state.set === 1 ? (
                <div key={1} className="container6">
                    <img key={2} width={100} height={100} src={discount} alt="Discount image" />
                    <h4 style={{color: "white"}}>Discount {this.state.discount} submitted successfully!</h4>
                    <button className='input_submit' onClick={this.newDiscount}> Ok </button>
                </div>
            ) : (
                <form className='input'>
                {this.state.set === 2 ? (
                    <Popup  contentStyle={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}} 
                    trigger={<button style={{backgroundColor: "red", width: "300px",  height: "50px", borderColor: 'red', borderRadius: '5px', color: 'white'}}>
                            Error! Cannot update this discount.
                        </button>} position="right center">
                        <div>{this.state.err_text}</div>
                    </Popup>)
                    : (<div></div>)
                }

            <div className="dropdown">
                <button className="dropbtn"> <b> {this.state.type} </b><i className="fa fa-caret-down"></i> </button>
                <div className="dropdown-content">
                    <a href="# " onClick={()=>(this.onChangeType("Text Book"))}>Text Book</a>
                    <a href="# " onClick={()=>(this.onChangeType("Novel"))}>Novel</a>
                    <a href="# " onClick={()=>(this.onChangeType("Story Book"))}>Story Book</a>
                </div>
            </div> 

                <div>
                    <label htmlFor="discount" className="white_label"><b>Discount</b></label>
                    <input
                        type="number"
                        className="input_box"
                        id="discount"
                        value={this.state.discount}
                        onChange={this.onChangeDiscount}
                    />
                </div>

                <button className='input_submit' onClick={this.save}> Set Disount ! </button>
            </form>
            )}
        </div>
        );
    }
}