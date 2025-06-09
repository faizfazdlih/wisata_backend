import express from 'express';
import { 
    getUlasan, 
    getUlasanByDestinasiId, 
    getUlasanByPenggunaId, 
    createUlasan, 
    deleteUlasan,
    deleteUlasanByUser,
    getRatingTertinggi
} from '../controllers/UlasanController.js';
import { verifyToken, verifyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute publik
router.get('/ulasan', getUlasan);
router.get('/ulasan/destinasi/:id_destinasi', getUlasanByDestinasiId);
router.get('/ulasan/statistik/rating', getRatingTertinggi);

// Rute yang memerlukan autentikasi
router.get('/ulasan/pengguna/:id_pengguna', verifyToken, getUlasanByPenggunaId);
router.post('/ulasan', verifyToken, createUlasan);
router.delete('/ulasan/user/:id', verifyToken, deleteUlasanByUser); // Rute baru untuk pengguna menghapus ulasan mereka sendiri

// Rute admin
router.delete('/ulasan/:id', verifyAdmin, deleteUlasan);

export default router;