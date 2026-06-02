import express from 'express';
import { loginAdmin, registerAdmin, addPaket, deletePaket, updatePaket, addKriteria, deleteKriteria, updateKriteria, getPemesanan } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);

adminRouter.post('/add-paket', upload.single('image'), authAdmin, addPaket);
adminRouter.delete('/delete-paket/:paketId', authAdmin, deletePaket);
adminRouter.put('/update-paket/:paketId', upload.single('image'), authAdmin, updatePaket);

adminRouter.post('/add-kriteria', authAdmin, addKriteria);
adminRouter.delete('/delete-kriteria/:kriteriaId', authAdmin, deleteKriteria);
adminRouter.put('/update-kriteria/:kriteriaId', authAdmin, updateKriteria);
adminRouter.get('/pemesanan', authAdmin, getPemesanan);

export default adminRouter;