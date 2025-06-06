import Favorit from '../models/FavoritModel.js';
import Destinasi from '../models/DestinasiModel.js';
import Pengguna from '../models/PenggunaModel.js';
import { Sequelize } from 'sequelize';

// Get semua favorit
export const getFavorit = async (req, res) => {
    try {
        const favorit = await Favorit.findAll({
            include: [
                {
                    model: Pengguna,
                    attributes: ['id_pengguna', 'nama']
                },
                {
                    model: Destinasi,
                    attributes: ['id_destinasi', 'nama_destinasi']
                }
            ]
        });
        res.json(favorit);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get favorit berdasarkan ID pengguna
export const getFavoritByPenggunaId = async (req, res) => {
    try {
        const favorit = await Favorit.findAll({
            where: {
                id_pengguna: req.params.id_pengguna
            },
            include: [{
                model: Destinasi,
                attributes: ['id_destinasi', 'nama_destinasi', 'url_gambar', 'lokasi']
            }]
        });
        res.json(favorit);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Buat favorit baru
export const createFavorit = async (req, res) => {
    try {
        // Cek apakah sudah ada favorit dengan id_pengguna dan id_destinasi yang sama
        const existingFavorit = await Favorit.findOne({
            where: {
                id_pengguna: req.body.id_pengguna,
                id_destinasi: req.body.id_destinasi
            }
        });

        if (existingFavorit) {
            return res.status(400).json({
                message: "Destinasi ini sudah ada di daftar favorit"
            });
        }

        await Favorit.create(req.body);
        res.json({
            message: "Favorit berhasil ditambahkan"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Hapus favorit
export const deleteFavorit = async (req, res) => {
    try {
        await Favorit.destroy({
            where: {
                id_favorit: req.params.id
            }
        });
        res.json({
            message: "Favorit berhasil dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get statistik destinasi terfavorit
export const getDestinasiTerfavorit = async (req, res) => {
    try {
        const favorit = await Favorit.findAll({
            attributes: [
                'id_destinasi',
                [Sequelize.fn('COUNT', Sequelize.col('id_favorit')), 'jumlah_favorit']
            ],
            include: [{
                model: Destinasi,
                attributes: ['nama_destinasi', 'url_gambar']
            }],
            group: ['id_destinasi'],
            order: [[Sequelize.literal('jumlah_favorit'), 'DESC']],
            limit: 5
        });
        res.json(favorit);
    } catch (error) {
        res.json({ message: error.message });
    }
};