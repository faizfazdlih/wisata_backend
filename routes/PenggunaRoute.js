import express from 'express';
import { 
    getPengguna, 
    getPenggunaById, 
    updatePengguna, 
    deletePengguna,
    register,
    login,
    getProfile,
    updateProfile,
    deleteProfile
} from '../controllers/PenggunaController.js';
import { verifyToken, verifyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute publik
router.post('/register', register);
router.post('/login', login);

// Rute yang memerlukan autentikasi
router.get('/profile', verifyToken, getProfile);
router.patch('/profile', verifyToken, updateProfile); // Rute baru untuk update profil
router.delete('/profile', verifyToken, deleteProfile); // Rute baru untuk hapus profil

// Rute admin
router.get('/pengguna', verifyAdmin, getPengguna);
router.get('/pengguna/:id', verifyAdmin, getPenggunaById);
router.patch('/pengguna/:id', verifyAdmin, updatePengguna);
router.delete('/pengguna/:id', verifyAdmin, deletePengguna);

export default router;