import express from 'express';
import {registerUser, loginUser, getProfile, updateProfile, allPaket, getPaket, allKriteria, orderPaket, orderHistory, uploadPaymentProof} from '../controllers/userControllers.js';
import {getRecommendation} from '../controllers/topsisController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/profile', authUser, getProfile);
userRouter.put('/update-profile', authUser, updateProfile);
userRouter.post('/order-paket', authUser, orderPaket);
userRouter.get('/order-history', authUser, orderHistory);
userRouter.post('/upload-payment-proof/:orderId', authUser, upload.single('paymentProof'), uploadPaymentProof);

userRouter.get('/paket', allPaket);
userRouter.get('/paket/:paketId', getPaket);
userRouter.get('/kriteria', allKriteria);

userRouter.post('/recommendation', getRecommendation);

export default userRouter;