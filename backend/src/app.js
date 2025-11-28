import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB  from './config/db.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

//Test Route
app.get("/", (req, res) => {
    res.json({status:"ok", message:"Backend is running!"});
});


const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    connectToDB();
    console.log(`🚀Server running on port ${PORT}`);
    

})