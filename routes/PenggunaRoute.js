import express from 'express';
import { 
    getPengguna, 
    getPenggunaById, 
    updatePengguna, 
    deletePengguna,
    register,
    login,
    getProfile
} from '../controllers/PenggunaController.js';
import { verifyToken, verifyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute publik
router.post('/register', register);
router.post('/login', login);

// Rute yang memerlukan autentikasi
router.get('/profile', verifyToken, getProfile);

// Rute admin
router.get('/pengguna', verifyAdmin, getPengguna);
router.get('/pengguna/:id', verifyAdmin, getPenggunaById);
router.patch('/pengguna/:id', verifyAdmin, updatePengguna);
router.delete('/pengguna/:id', verifyAdmin, deletePengguna);

export default router;