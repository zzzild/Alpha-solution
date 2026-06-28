import express from 'express';
import { loginAdmin, registerAdmin, addPaket, deletePaket, updatePaket, addKriteria, deleteKriteria, updateKriteria, getPemesanan, getDashStats, verifyPayment } from '../controllers/adminController.js';
import { getPaket } from '../controllers/userControllers.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);

adminRouter.post('/add-paket', upload.single('image'), authAdmin, addPaket);
adminRouter.delete('/delete-paket/:paketId', authAdmin, deletePaket);
adminRouter.put('/update-paket/:paketId', upload.single('image'), authAdmin, updatePaket);
adminRouter.get('/daftar-paket', authAdmin, getPaket)

adminRouter.post('/add-kriteria', authAdmin, addKriteria);
adminRouter.delete('/delete-kriteria/:kriteriaId', authAdmin, deleteKriteria);
adminRouter.put('/update-kriteria/:kriteriaId', authAdmin, updateKriteria);
adminRouter.get('/dashboard-stats', authAdmin, getDashStats);

adminRouter.get('/pemesanan', getPemesanan);
adminRouter.put('/verify-payment/:orderId', authAdmin, verifyPayment)

export default adminRouter;