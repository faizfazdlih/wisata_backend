import Gambar from '../models/GambarModel.js';
import Destinasi from '../models/DestinasiModel.js';

// Get semua gambar
export const getGambar = async (req, res) => {
    try {
        const gambar = await Gambar.findAll({
            include: [{
                model: Destinasi
            }]
        });
        res.json(gambar);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get gambar berdasarkan ID destinasi
export const getGambarByDestinasiId = async (req, res) => {
    try {
        const gambar = await Gambar.findAll({
            where: {
                id_destinasi: req.params.id_destinasi
            }
        });
        res.json(gambar);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Buat gambar baru
export const createGambar = async (req, res) => {
    try {
        await Gambar.create(req.body);
        res.json({
            message: "Gambar berhasil ditambahkan"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Hapus gambar
export const deleteGambar = async (req, res) => {
    try {
        await Gambar.destroy({
            where: {
                id_gambar: req.params.id
            }
        });
        res.json({
            message: "Gambar berhasil dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};