import express from 'express';
import { 
    getGambar, 
    getGambarByDestinasiId, 
    createGambar, 
    deleteGambar 
} from '../controllers/GambarController.js';
import { verifyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute publik
router.get('/gambar', getGambar);
router.get('/gambar/destinasi/:id_destinasi', getGambarByDestinasiId);

// Rute admin
router.post('/gambar', verifyAdmin, createGambar);
router.delete('/gambar/:id', verifyAdmin, deleteGambar);

export default router;