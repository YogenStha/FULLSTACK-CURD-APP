// building the express sever
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import pool from "./config/db.js"; 
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api",userRoutes)

//Error Handling middleware
app.use(errorHandling);

//Create table before stsrting server
createUserTable();

//Testing POSTGRES Connection
app.get("/", async (req, res) => {
  try {
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("End");
    res.send(`The database name is: ${result.rows[0].current_database}`);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).send("Internal Server Error");
  }
});


//Server running
app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});