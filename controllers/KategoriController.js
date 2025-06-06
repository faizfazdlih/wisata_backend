import Kategori from '../models/KategoriModel.js';

// Get semua kategori
export const getKategori = async (req, res) => {
    try {
        const kategori = await Kategori.findAll();
        res.json(kategori);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get kategori berdasarkan ID
export const getKategoriById = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                id_kategori: req.params.id
            }
        });
        res.json(kategori);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Buat kategori baru
export const createKategori = async (req, res) => {
    try {
        await Kategori.create(req.body);
        res.json({
            message: "Kategori berhasil ditambahkan"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Update kategori
export const updateKategori = async (req, res) => {
    try {
        await Kategori.update(req.body, {
            where: {
                id_kategori: req.params.id
            }
        });
        res.json({
            message: "Kategori berhasil diperbarui"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Hapus kategori
export const deleteKategori = async (req, res) => {
    try {
        await Kategori.destroy({
            where: {
                id_kategori: req.params.id
            }
        });
        res.json({
            message: "Kategori berhasil dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};