import { useEffect, useState } from "react";
import { getInvoiceList, deleteInvoice } from "../api";
import { useNavigate } from "react-router-dom";
// import '../Invoicelist.css'

const Invoicelist = () => {
  const [invoices, setInvoices] = useState(null);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  const invoiceListFunc = async () => {
    const res = await getInvoiceList();
    setInvoices(res);
    return res;
  };

  useEffect(() => {
    invoiceListFunc();
    // setLoading(false);
  }, []);

  const handelDelete = async (id) => { 
    const res = await deleteInvoice(id);
    if (res.data.success) {
      invoiceListFunc();
    }
  } 
 

  return (
    <div className="invoice-list-container">
      <h2 className="heading" style={{ marginTop: "1%", marginBottom: "2%" }}>
        Invoice List
      </h2>
      {invoices == null ? (
        <p className="heading" style={{ marginTop: "1%", marginBottom: "2%" }}>Loading...</p>
      ) : invoices.data.length > 0 ? (
        <ul>
          {invoices.data.map((invoice) => (
            <li
              key={invoice._id}
              style={{
                listStyle: "none",
                width: "60%",
                marginLeft: "20%",
                marginBottom: "1%",
              }}
            >
              <div className="card invoice-style">
                <div className="card-header heading">
                  <h6>Invoice Date: {invoice.date}</h6>
                </div>
                <div className="card-body">
                  <table className="table table-style table-striped">
                    <thead>
                      <tr className="desktop-view">
                        <th>Bill To</th>
                        <th>Bill From</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="desktop-view">
                        <td>{invoice.nameTo}</td>
                        <td>{invoice.nameFrom}</td>
                        <td>{invoice.total}</td>
                        <td>
                          {
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => navigate(`/edit-invoice/${invoice._id}`)}
                            >
                              Edit
                            </button>
                            
                          }
                          {
                            <button type="button" className="btn btn-outline-danger" style={{marginLeft: "12px"}} onClick={() => handelDelete(invoice._id)}>Delete</button>
                          }
                        </td>
                      </tr>
                      <tr className="mobile-view">
                        <td colSpan="2"><strong>Bill To:</strong> {invoice.nameTo}</td>
                        <td colSpan="2"><strong>Bill From:</strong> {invoice.nameFrom}</td>
                      </tr>
                      <tr className="mobile-view">
                        <td colSpan="2"><strong>Total:</strong> {invoice.total}</td>
                        <td colSpan="2">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => navigate(`/edit-invoice/${invoice._id}`)}
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-outline-danger" 
                            style={{ marginTop: "12px" }} 
                            onClick={() => handelDelete(invoice._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h5 className="heading" style={{fontSize: "30px", marginBottom: "2%"}}>No old invoices</h5>
      )}
      <div id="gen-inv-btn">
          <button
            className=" btn btn-primary gen-btn"  
            onClick={() => navigate('/create-invoice')}
          >
            Generate Another Invoice
          </button></div>
    </div>
  );
};

export default Invoicelist;
