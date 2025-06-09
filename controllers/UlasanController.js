import Ulasan from '../models/UlasanModel.js';
import Pengguna from '../models/PenggunaModel.js';
import Destinasi from '../models/DestinasiModel.js';
import { Sequelize } from 'sequelize';

// Get semua ulasan
export const getUlasan = async (req, res) => {
    try {
        const ulasan = await Ulasan.findAll({
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
        res.json(ulasan);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get ulasan berdasarkan ID destinasi
export const getUlasanByDestinasiId = async (req, res) => {
    try {
        const ulasan = await Ulasan.findAll({
            where: {
                id_destinasi: req.params.id_destinasi
            },
            include: [{
                model: Pengguna,
                attributes: ['id_pengguna', 'nama']
            }]
        });
        res.json(ulasan);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get ulasan berdasarkan ID pengguna
export const getUlasanByPenggunaId = async (req, res) => {
    try {
        const ulasan = await Ulasan.findAll({
            where: {
                id_pengguna: req.params.id_pengguna
            },
            include: [{
                model: Destinasi,
                attributes: ['id_destinasi', 'nama_destinasi', 'url_gambar']
            }]
        });
        res.json(ulasan);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Buat ulasan baru
export const createUlasan = async (req, res) => {
    try {
        await Ulasan.create(req.body);
        res.json({
            message: "Ulasan berhasil ditambahkan"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Hapus ulasan oleh pengguna yang membuatnya
export const deleteUlasanByUser = async (req, res) => {
    try {
        const ulasan = await Ulasan.findOne({
            where: {
                id_ulasan: req.params.id,
                id_pengguna: req.userId // Pastikan ulasan milik pengguna yang sedang login
            }
        });

        if (!ulasan) {
            return res.status(404).json({ message: "Ulasan tidak ditemukan atau Anda tidak memiliki izin" });
        }

        await Ulasan.destroy({
            where: {
                id_ulasan: req.params.id,
                id_pengguna: req.userId
            }
        });
        
        res.json({
            message: "Ulasan berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hapus ulasan (untuk admin)
export const deleteUlasan = async (req, res) => {
    try {
        const ulasan = await Ulasan.findOne({
            where: {
                id_ulasan: req.params.id
            }
        });

        if (!ulasan) {
            return res.status(404).json({ message: "Ulasan tidak ditemukan" });
        }

        await Ulasan.destroy({
            where: {
                id_ulasan: req.params.id
            }
        });
        
        res.json({
            message: "Ulasan berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get statistik rating tertinggi
export const getRatingTertinggi = async (req, res) => {
    try {
        const rating = await Ulasan.findAll({
            attributes: [
                'id_destinasi',
                [Sequelize.fn('AVG', Sequelize.col('penilaian')), 'rata_rata_rating']
            ],
            include: [{
                model: Destinasi,
                attributes: ['nama_destinasi', 'url_gambar']
            }],
            group: ['id_destinasi'],
            order: [[Sequelize.literal('rata_rata_rating'), 'DESC']],
            limit: 5
        });
        res.json(rating);
    } catch (error) {
        res.json({ message: error.message });
    }
};