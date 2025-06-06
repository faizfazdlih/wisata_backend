import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Kategori = db.define('kategori', {
    id_kategori: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kategori: {
        type: DataTypes.STRING(100)
    },
    deskripsi: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Kategori;