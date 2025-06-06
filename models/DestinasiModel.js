import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Kategori from './KategoriModel.js';

const { DataTypes } = Sequelize;

const Destinasi = db.define('destinasi', {
    id_destinasi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_kategori: {
        type: DataTypes.INTEGER
    },
    nama_destinasi: {
        type: DataTypes.STRING(150)
    },
    deskripsi: {
        type: DataTypes.TEXT
    },
    lokasi: {
        type: DataTypes.STRING(255)
    },
    url_gambar: {
        type: DataTypes.STRING(255)
    },
    jam_buka: {
        type: DataTypes.STRING(100)
    },
    harga_tiket: {
        type: DataTypes.STRING(100)
    },
    tanggal_dibuat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Destinasi.belongsTo(Kategori, { foreignKey: 'id_kategori' });
Kategori.hasMany(Destinasi, { foreignKey: 'id_kategori' });

export default Destinasi;