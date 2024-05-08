import express from "express";
import DBConnect from "./db/db.js";
import { createData, getData, saveMultipalData } from "./controller/jsonData.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  method: "GET, POST"
}))
app.use(bodyParser.json({limit:"50mb"}));



app.post("/createData", async (req, res) => {
  try {
    await createData(req.body);
    res.status(200).send("Data created successfully");
  } catch (err) {
    console.log("Error creating data", err);
    res.status(500).send("Internal sever error");
  }
});
app.get("/getData", async (req, res) => {
  try {
    const dataList = await getData();
    res.status(200).json(dataList)
} catch (err) {
    
    console.log("Error Fetching data list", err);
    res.status(500).send("Internal sever error");
  }
});

app.post("/saveMultipleData", async (req, res) => {
    try {
      const dataArray = req.body; 
      await saveMultipalData(dataArray); 
      res.status(200).send("Multiple documents saved successfully");
    } catch (err) {
      console.log("Error saving multiple documents", err);
      res.status(500).send("Internal server error");
    }
  });

DBConnect.then(() => {
  console.log("DB Connected");
}).catch((err) => {
  console.log("DB Connection err", err);
});

app.listen(8080, () => {
  console.log("Server is working on PORT:8080");
});
