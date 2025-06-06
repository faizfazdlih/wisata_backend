import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Pengguna = db.define('pengguna', {
    id_pengguna: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true
    },
    kata_sandi: {
        type: DataTypes.STRING(255)
    },
    peran: {
        type: DataTypes.ENUM('admin', 'pengguna'),
        defaultValue: 'pengguna'
    },
    tanggal_dibuat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Pengguna;