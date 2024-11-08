import { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MdDelete } from "react-icons/md"; 

const Tableform = () => {
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

  return (
    <>
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
                <th style={{ width: "15%" }}>
                  <h5>Qty</h5>
                </th>
                <th style={{ width: "15%" }}>
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
                      <td className="col-md-2">
                        <MdDelete
                          onClick={() => delData(item.product)}
                          style={{ fontSize: "24px", cursor: "pointer"}}
                        />
                      </td>
                    </tr>
                  ))
                : null}
              <tr>
                <td className="text-right">
                  <p>
                    <strong>Discount: </strong>
                  </p>
                  <p>
                    <strong>Total Amount: </strong>
                  </p>
                  <p>
                    <strong>Payable Amount: </strong>
                  </p>
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
          <button
            className="btn btn-primary Button"
            onClick={() => window.location.reload()}
          >
            Generate Another Invoice
          </button>
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
    </>
  );
};

export default Tableform;
