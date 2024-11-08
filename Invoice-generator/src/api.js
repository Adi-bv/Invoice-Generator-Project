import axios from 'axios';
const api = axios.create({
  baseURL: 'https://invoice-generator-project.vercel.app/api',
  //baseURL: 'http://localhost:8003/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const register = async (userData) => { 
  try {
    const res = await api.post('/users/register', userData); 
    return res.data;
  } catch (error) { 
    throw new Error(error);
    
  }
};

export const login = async (userData) => {
  try {  
    const res = await api.post('/users/login', userData); 
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

export const createInvoice = async (invoiceData) => {  
  try {  
    const res = await api.post('/invoices', invoiceData); 
    return res.data;
  } catch (error) { 
    throw new Error(error);
  }
}

export const getInvoiceList = async () => {
  try {
    const res = await api.get('/invoices'); 
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getInvoice = async (data) => {
  try { 
    const res = await api.get(`/invoices/${data.invoiceId}`); 
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const updateInvoice = async (invoiceData, id) => { 
  try {
    const res = await api.put(`invoices/${id.invoiceId}`);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const deleteInvoice = async (id) => {
  console.log(id);
  try {
    const res = await api.delete(`invoices/delete/${id}`);
    console.log("api res", res);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
