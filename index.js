import express from 'express';
import cors from 'cors';
import db from './config/database.js';

// Import routes
import PenggunaRoute from './routes/PenggunaRoute.js';
import KategoriRoute from './routes/KategoriRoute.js';
import DestinasiRoute from './routes/DestinasiRoute.js';
import GambarRoute from './routes/GambarRoute.js';
import UlasanRoute from './routes/UlasanRoute.js';
import FavoritRoute from './routes/FavoritRoute.js';

const app = express();

// Coba koneksi ke database
try {
    await db.authenticate();
    console.log('Database connected...');
    // Sync database (uncomment jika ingin membuat tabel otomatis)
    await db.sync();
} catch (error) {
    console.error('Connection error:', error);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', PenggunaRoute);
app.use('/api', KategoriRoute);
app.use('/api/destinasi', DestinasiRoute);
app.use('/api', GambarRoute);
app.use('/api', UlasanRoute);
app.use('/api', FavoritRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));