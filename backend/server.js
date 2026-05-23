import exspress from 'express';
import cors from 'cors';
import 'dotenv/config';


const app = exspress();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(exspress.json());
app.use(exspress.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.setEndcoding('Api is working');
})

// endpoints

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});