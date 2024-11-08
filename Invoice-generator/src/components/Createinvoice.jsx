import { useState } from 'react';
import '../App.css'
//import Tableform from './Tableform'; 
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MdDelete } from "react-icons/md"; 
import { createInvoice } from "../api";
import { useNavigate } from "react-router-dom";


const Createinvoice = () => {

  const date= new Date().toISOString().slice(0,10);
  const [nameTo, setNameTo] = useState('');
  const [addressTo, setAddressTo] = useState('');
  const [nameFrom, setNameFrom] = useState('');
  const [addressFrom, setAddressFrom] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const [List, setList] = useState([]);
  const [Amount, setAmount] = useState("");
  const [openAirPopup, setAirPopup] = useState(false);
  const [Item, setItem] = useState("");
  const [discount, setDiscount] = useState("");

  const addData = () => {
    const newList = [...List, { product: Item, amount: Amount, quantity: 1 }];
    setList(newList);
    setItem("");
    setAmount("");
    setAirPopup(false);
  };

  const delData = (item) => {
    const newList = List.filter((element) => element.product !== item);
    setList(newList);
  };

  const handleQty = (index, newQty) => {
    const updatedList = [...List];
    updatedList[index].quantity = newQty;
    setList(updatedList);
  };

  const calculateSum = () => {
    let sum = 0;
    List.forEach((item) => {
      sum += item.amount * item.quantity;
    });

    if (discount !== "") {
      let dis = parseFloat(discount);
      sum = sum - (sum * dis) / 100;
    }

    return sum;
  };

  const sum = calculateSum();

  const handleOnSave = async () => {
    const data = { 
      date: String(new Date().toISOString().slice(0,10)),
      dueDate: String(dueDate),
      nameTo: nameTo,
      addressTo: addressTo,
      nameFrom: nameFrom,
      addressFrom: addressFrom,
      items: List,
      discount: discount,
      total: sum
    }; 
    try {
      const res = await createInvoice(data);
      if(res?.success){
        setTimeout(() => {
          navigate("/invoice-list"); // Redirect user to login page
        },1000);
      }
      else{
        setError(res?.msg);
      }
      } catch (error) {
        setError(error);
      }
    };

  return(
    <div>
    <div className="currDate"><b>Current Date: </b>{date}</div>
    <div className="dueDate"><b>Due Date: </b><input className="inputData" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/></div>
    <hr id="line"/>
    <div className="bill">
      <div className="bill-to">
        <p><b>Bill to:</b></p>
        <input className="inputData" type="text" value={nameTo} placeholder='Who is this invoice to?' onChange={(e) => setNameTo(e.target.value)}></input>
        <input className="inputData margin" type="text" placeholder='Billing Address' value={addressTo} onChange={(e) => setAddressTo(e.target.value)}></input>
      </div>
      <div className="bill-from">
        <p><b>Bill from:</b></p>
        <input className="inputData" type="text" placeholder='Who is this invoice from?' value={nameFrom} onChange={(e) => setNameFrom(e.target.value)}></input>
        <input className="inputData margin" type="text" placeholder='Billing Address' value={addressFrom} onChange={(e) => setAddressFrom(e.target.value)}></input>
      </div>
    </div>
    <hr id="line"/>
    {/* <Tableform/> */}
    <div className="container">
        <div>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "50%" }}>
                  <h5>Products</h5>
                </th>
                <th style={{ width: "20%" }}>
                  <h5>Amount</h5>
                </th>
                <th style={{ width: "12%" }}>
                  <h5>Qty</h5>
                </th>
                <th style={{ width: "19%" }}>
                  <h5>Action</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {List.length
                ? List.map((item, index) => (
                    <tr key={index}>
                      <td className="col-md-8">{item.product}</td>
                      <td className="col-md-2">
                        <i className="fas fa-rupee-sign" aria-hidden="true"></i>{" "}
                        ₹ {item.amount}
                      </td>
                      <td className="col-md-2">
                        <input
                          type="number"
                          className="inputData"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQty(index, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td className="col-md-2" >
                        <MdDelete
                          onClick={() => delData(item.product)}
                          style={{ fontSize: "24px", cursor: "pointer" , marginTop: "20 %"}}
                        />
                      </td>
                    </tr>
                  ))
                : null}
              <tr>
                <td className="text-right">
                  <p style={{marginTop: "3%"}}>
                    <strong>Discount: </strong>
                  </p>
                  <p style={{marginTop: "6%"}}>
                    <strong>Total Amount: </strong>
                  </p>
                  {/* <p>
                    <strong>Payable Amount: </strong>
                  </p> */}
                </td>
                <td colSpan="3">
                  <p>
                    <input
                      className="inputData"
                      style={{ width: "80px" }}
                      type="number"
                      step="0.01"
                      placeholder="00"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{" "}
                      {sum}
                    </strong>
                  </p>
                </td>
              </tr>
              <tr style={{ color: "#F81D2D" }}>
                <td className="text-right">
                  <h4>
                    <strong>Total:</strong>
                  </h4>
                </td>
                <td colSpan="3" className="text-left">
                  <h4>
                    <strong>
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{" "}
                      {sum}{" "}
                    </strong>
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="align-btn">
          <button className="btn btn-primary" onClick={() => setAirPopup(true)}>
            Add Product
          </button>
          <div className="heading" style={{fontSize:"20px" ,color:"red"}}>{error && <p>{ error }</p>}</div>
          <div >
            <button
            className="btn btn-primary  "
            onClick={handleOnSave}
          >
            Save
          </button></div>
          {/* <button
            className="btn btn-primary  "
            onClick={() => window.location.reload()}
          >
            Generate Another Invoice
          </button> */}
        </div>
      </div>
      <Dialog open={openAirPopup}>
        <DialogTitle>
          <div className="title">
            <div className="hed">New product</div>
            <div className="icon-cross" onClick={() => setAirPopup(false)}>
              <CloseIcon />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input
                type="text"
                value={Item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Product Name"
              />
              <input
                className="margin-left"
                type="number"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount ₹"
              />
            </div>
            <div className="buttons buttons2">
              <button className="btn btn-primary margin btn2" onClick={addData}>
                Add
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div> 
    
  )
};

export default Createinvoice;