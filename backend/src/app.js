import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB  from './config/db.js';

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Test Route
app.get("/api/health", (req, res) => {
    res.json({status:"ok", message:"Backend is running!"});
});


const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    connectToDB();
    console.log(`🚀Server running on port ${PORT}`);
    

})