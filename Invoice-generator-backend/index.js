const express = require("express");
const connectDB = require('./connect.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({
  origin: "https://invoice-generator-rho-neon.vercel.app",
  //origin: "http://localhost:5173",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

const connect = async () => {
  await connectDB();
}

connect();

const userRoutes = require("./routes/users");
const invoiceRoutes = require("./routes/invoices");


app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);


const PORT = process.env.PORT || 8003;
app.listen(PORT, () => (console.log(`Server Stared on Port:${PORT}`)));
