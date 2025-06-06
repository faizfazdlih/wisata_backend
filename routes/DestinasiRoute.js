// routes/DestinasiRoute.js
import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/AuthMiddleware.js';
import {
  getAllDestinasi,
  getDestinasiById,
  createDestinasi,
  updateDestinasi,
  deleteDestinasi
} from '../controllers/DestinasiController.js';

const router = express.Router();

// Endpoint publik, semua user bisa lihat destinasi
router.get('/', getAllDestinasi);
router.get('/:id', getDestinasiById);

// Endpoint yang perlu login sebagai admin
router.post('/', verifyAdmin, createDestinasi);
router.put('/:id', verifyAdmin, updateDestinasi);
router.delete('/:id', verifyAdmin, deleteDestinasi);

export default router;