import Destinasi from '../models/DestinasiModel.js';
import Kategori from '../models/KategoriModel.js';

// Get semua destinasi dengan kategori
export const getAllDestinasi = async (req, res) => {
    try {
        const destinasi = await Destinasi.findAll({
            include: [{ 
                model: Kategori,
                attributes: ['id_kategori', 'nama_kategori']
            }],
            order: [['tanggal_dibuat', 'DESC']]
        });
        res.status(200).json(destinasi);
    } catch (error) {
        console.error('Error get all destinasi:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get destinasi berdasarkan ID
// Get destinasi berdasarkan ID
export const getDestinasiById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        // Validasi ID
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID destinasi harus berupa angka" });
        }
        
        const destinasi = await Destinasi.findOne({
            where: { id_destinasi: id },
            include: [{ 
                model: Kategori,
                attributes: ['id_kategori', 'nama_kategori']
            }]
        });
        
        if (!destinasi) {
            return res.status(404).json({ message: "Destinasi tidak ditemukan" });
        }
        
        res.status(200).json(destinasi);
    } catch (error) {
        console.error('Error get destinasi by id:', error);
        res.status(500).json({ message: error.message });
    }
};

// Buat destinasi baru
export const createDestinasi = async (req, res) => {
    try {
        const {
            nama_destinasi,
            deskripsi,
            lokasi,
            url_gambar,
            jam_buka,
            harga_tiket,
            id_kategori
        } = req.body;

        // Validasi input yang wajib
        if (!nama_destinasi || !deskripsi || !lokasi || !id_kategori) {
            return res.status(400).json({ 
                message: "Field nama_destinasi, deskripsi, lokasi, dan id_kategori wajib diisi" 
            });
        }

        // Validasi kategori exists
        const kategoriExists = await Kategori.findByPk(id_kategori);
        if (!kategoriExists) {
            return res.status(400).json({ message: "Kategori tidak ditemukan" });
        }

        // Buat destinasi baru
        const newDestinasi = await Destinasi.create({
            nama_destinasi: nama_destinasi.trim(),
            deskripsi: deskripsi.trim(),
            lokasi: lokasi.trim(),
            url_gambar: url_gambar ? url_gambar.trim() : null,
            jam_buka: jam_buka ? jam_buka.trim() : null,
            harga_tiket: harga_tiket ? harga_tiket.trim() : null,
            id_kategori: parseInt(id_kategori)
        });

        res.status(201).json({ 
            message: "Destinasi berhasil ditambahkan",
            data: newDestinasi
        });
    } catch (error) {
        console.error('Error create destinasi:', error);
        
        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        
        // Handle foreign key constraint errors
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ message: "Kategori yang dipilih tidak valid" });
        }
        
        res.status(500).json({ message: "Terjadi kesalahan internal server" });
    }
};

// Update destinasi
export const updateDestinasi = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama_destinasi,
            deskripsi,
            lokasi,
            url_gambar,
            jam_buka,
            harga_tiket,
            id_kategori
        } = req.body;

        // Cek apakah destinasi exists
        const destinasi = await Destinasi.findByPk(id);
        if (!destinasi) {
            return res.status(404).json({ message: "Destinasi tidak ditemukan" });
        }

        // Validasi input yang wajib
        if (!nama_destinasi || !deskripsi || !lokasi || !id_kategori) {
            return res.status(400).json({ 
                message: "Field nama_destinasi, deskripsi, lokasi, dan id_kategori wajib diisi" 
            });
        }

        // Validasi kategori exists jika id_kategori diubah
        if (id_kategori && id_kategori !== destinasi.id_kategori) {
            const kategoriExists = await Kategori.findByPk(id_kategori);
            if (!kategoriExists) {
                return res.status(400).json({ message: "Kategori tidak ditemukan" });
            }
        }

        // Update destinasi
        await destinasi.update({
            nama_destinasi: nama_destinasi.trim(),
            deskripsi: deskripsi.trim(),
            lokasi: lokasi.trim(),
            url_gambar: url_gambar ? url_gambar.trim() : null,
            jam_buka: jam_buka ? jam_buka.trim() : null,
            harga_tiket: harga_tiket ? harga_tiket.trim() : null,
            id_kategori: parseInt(id_kategori)
        });

        res.status(200).json({ 
            message: "Destinasi berhasil diperbarui",
            data: destinasi
        });
    } catch (error) {
        console.error('Error update destinasi:', error);
        
        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        
        // Handle foreign key constraint errors
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ message: "Kategori yang dipilih tidak valid" });
        }
        
        res.status(500).json({ message: "Terjadi kesalahan internal server" });
    }
};

// Hapus destinasi
export const deleteDestinasi = async (req, res) => {
    try {
        const { id } = req.params;
        
        const destinasi = await Destinasi.findByPk(id);
        if (!destinasi) {
            return res.status(404).json({ message: "Destinasi tidak ditemukan" });
        }

        await destinasi.destroy();
        
        res.status(200).json({ message: "Destinasi berhasil dihapus" });
    } catch (error) {
        console.error('Error delete destinasi:', error);
        res.status(500).json({ message: "Terjadi kesalahan internal server" });
    }
};