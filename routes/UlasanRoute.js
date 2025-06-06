import express from 'express';
import { 
    getUlasan, 
    getUlasanByDestinasiId, 
    getUlasanByPenggunaId, 
    createUlasan, 
    deleteUlasan,
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

// Rute admin
router.delete('/ulasan/:id', verifyAdmin, deleteUlasan);

export default router;