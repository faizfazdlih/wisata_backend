import express from 'express';
import { 
    getFavorit, 
    getFavoritByPenggunaId, 
    createFavorit, 
    deleteFavorit,
    getDestinasiTerfavorit
} from '../controllers/FavoritController.js';
import { verifyToken, verifyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Rute yang memerlukan autentikasi
router.get('/favorit/pengguna/:id_pengguna', verifyToken, getFavoritByPenggunaId);
router.post('/favorit', verifyToken, createFavorit);
router.delete('/favorit/:id', verifyToken, deleteFavorit);

// Rute admin
router.get('/favorit', verifyAdmin, getFavorit);
router.get('/favorit/statistik/terfavorit', verifyAdmin, getDestinasiTerfavorit);

export default router;