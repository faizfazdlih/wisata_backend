import express from 'express';
import { 
    getKategori, 
    getKategoriById, 
    createKategori, 
    updateKategori, 
    deleteKategori 
} from '../controllers/KategoriController.js';
import { verifyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute publik (dapat diakses semua pengguna)
router.get('/kategori', getKategori);
router.get('/kategori/:id', getKategoriById);

// Rute admin (hanya dapat diakses oleh admin)
router.post('/kategori', verifyAdmin, createKategori);
router.patch('/kategori/:id', verifyAdmin, updateKategori);
router.delete('/kategori/:id', verifyAdmin, deleteKategori);

export default router;