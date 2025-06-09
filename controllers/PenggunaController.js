import Pengguna from '../models/PenggunaModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Get semua pengguna
export const getPengguna = async (req, res) => {
    try {
        const pengguna = await Pengguna.findAll({
            attributes: ['id_pengguna', 'nama', 'email', 'peran', 'tanggal_dibuat']
        });
        res.json(pengguna);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get pengguna berdasarkan ID
export const getPenggunaById = async (req, res) => {
    try {
        const pengguna = await Pengguna.findOne({
            where: {
                id_pengguna: req.params.id
            },
            attributes: ['id_pengguna', 'nama', 'email', 'peran', 'tanggal_dibuat']
        });
        res.json(pengguna);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Register pengguna baru
export const register = async (req, res) => {
    const { nama, email, kata_sandi, konfirmasi_kata_sandi } = req.body;
    
    // Validasi input
    if (!nama || !email || !kata_sandi || !konfirmasi_kata_sandi) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }
    
    if (kata_sandi !== konfirmasi_kata_sandi) {
        return res.status(400).json({ message: "Kata sandi dan konfirmasi kata sandi tidak cocok" });
    }
    
    try {
        // Cek apakah email sudah terdaftar
        const emailExists = await Pengguna.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }
        
        // Hash kata sandi
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(kata_sandi, salt);
        
        // Buat pengguna baru
        await Pengguna.create({
            nama: nama,
            email: email,
            kata_sandi: hashedPassword,
            peran: 'pengguna'
        });
        
        res.status(201).json({ message: "Pengguna berhasil didaftarkan" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login pengguna
export const login = async (req, res) => {
    const { email, kata_sandi } = req.body;
    
    try {
        // Cek apakah pengguna ada
        const pengguna = await Pengguna.findOne({ where: { email: email } });
        if (!pengguna) {
            return res.status(400).json({ message: "Email atau kata sandi salah" });
        }
        
        // Verifikasi kata sandi
        const validPassword = await bcrypt.compare(kata_sandi, pengguna.kata_sandi);
        if (!validPassword) {
            return res.status(400).json({ message: "Email atau kata sandi salah" });
        }
        
        // Buat token JWT
        const token = jwt.sign(
            { id: pengguna.id_pengguna, peran: pengguna.peran },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        res.json({
            id_pengguna: pengguna.id_pengguna,
            nama: pengguna.nama,
            email: pengguna.email,
            peran: pengguna.peran,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get profil pengguna yang sedang login
export const getProfile = async (req, res) => {
    try {
        const pengguna = await Pengguna.findOne({
            where: {
                id_pengguna: req.userId
            },
            attributes: ['id_pengguna', 'nama', 'email', 'peran', 'tanggal_dibuat']
        });
        res.json(pengguna);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update pengguna
export const updatePengguna = async (req, res) => {
    try {
        // Jika ada kata sandi baru, hash kata sandi
        if (req.body.kata_sandi) {
            const salt = await bcrypt.genSalt(10);
            req.body.kata_sandi = await bcrypt.hash(req.body.kata_sandi, salt);
        }
        
        await Pengguna.update(req.body, {
            where: {
                id_pengguna: req.params.id
            }
        });
        res.json({
            message: "Pengguna berhasil diperbarui"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Hapus pengguna
export const deletePengguna = async (req, res) => {
    try {
        await Pengguna.destroy({
            where: {
                id_pengguna: req.params.id
            }
        });
        res.json({
            message: "Pengguna berhasil dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Update profil pengguna yang sedang login
export const updateProfile = async (req, res) => {
    try {
        // Jika ada kata sandi baru, hash kata sandi
        if (req.body.kata_sandi) {
            const salt = await bcrypt.genSalt(10);
            req.body.kata_sandi = await bcrypt.hash(req.body.kata_sandi, salt);
        }
        
        await Pengguna.update(req.body, {
            where: {
                id_pengguna: req.userId
            }
        });
        res.json({
            message: "Profil berhasil diperbarui"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hapus profil pengguna yang sedang login
export const deleteProfile = async (req, res) => {
    try {
        await Pengguna.destroy({
            where: {
                id_pengguna: req.userId
            }
        });
        res.json({
            message: "Akun berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};