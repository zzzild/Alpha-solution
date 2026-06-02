import exspress from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = exspress();
const PORT = process.env.PORT || 4000;

dotenv.config();
connectCloudinary();
connectDB();

// middleware
app.use(cors());
app.use(exspress.json());
app.use(exspress.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.setEndcoding('Api is working');
})

// endpoints
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});