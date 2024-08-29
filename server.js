import express from "express";
import mongoose, { connect } from "mongoose";
import bodyParse from "express";
import productRouter from './Routes/product.js';
import cors from 'cors';
import UserRouter from './Routes/UserRoute.js';
import { config, configDotenv } from "dotenv";

const app = express();
app.use(bodyParse.json());


//env setup
config({path: ".env"})

app.use(cors({
  origin:true,
  methods:["Get", "POST", "DELETE", "PUT"],
  credentials:true
}))
//productRouter 
app.use('/api/products', productRouter)

//MVC
// M = Models
// V = Views - Client (React App)
// C = Controllers - (Function)


// userrouter  
app.use('/api/user',UserRouter)


mongoose 

  .connect(process.env.Mongo_Url, { dbName: "Volcanus_Batch_4_4pm" })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(() => console.log("Internal server error"));

const port = 1000;

app.listen(port, () => console.log(`server is running on port ${port}`));
