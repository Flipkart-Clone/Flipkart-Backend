import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import DefaultData from "./default.js";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";

const port = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

const url = process.env.url || `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce.odkyszp.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
dotenv.config();
Connection(url);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

app.listen(port, () => {
  console.log("listening");
});

DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams["MID"] = process.env.PAYTM_MID;
paytmParams["WEBSITE"] = process.env.PAYTM_WEBSITE;
paytmParams["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
paytmParams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams["ORDER_ID"] = uuid();
paytmParams["CUST_ID"] = process.env.PAYTM_CUST_ID; 
paytmParams["TXN_AMOUNT"] = '100'; 
paytmParams["EMAIL"] = 'keshab2804@gmail.com'
paytmParams["CALLBACK_URL"] = 'https://flipkartcloneserver.onrender.com/callback'; 
paytmParams["MOBILE_NO"] = '0123456789'; 
