import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Destinasi from './DestinasiModel.js';
import Pengguna from './PenggunaModel.js';

const { DataTypes } = Sequelize;

const Ulasan = db.define('ulasan', {
    id_ulasan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_destinasi: {
        type: DataTypes.INTEGER
    },
    id_pengguna: {
        type: DataTypes.INTEGER
    },
    penilaian: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    komentar: {
        type: DataTypes.TEXT
    },
    tanggal_ulasan: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Ulasan.belongsTo(Destinasi, { foreignKey: 'id_destinasi' });
Destinasi.hasMany(Ulasan, { foreignKey: 'id_destinasi' });

Ulasan.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pengguna.hasMany(Ulasan, { foreignKey: 'id_pengguna' });

export default Ulasan;