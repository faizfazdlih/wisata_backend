import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Destinasi from './DestinasiModel.js';

const { DataTypes } = Sequelize;

const Gambar = db.define('gambar', {
    id_gambar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_destinasi: {
        type: DataTypes.INTEGER
    },
    url_gambar: {
        type: DataTypes.STRING(255)
    },
    keterangan: {
        type: DataTypes.STRING(255)
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Gambar.belongsTo(Destinasi, { foreignKey: 'id_destinasi' });
Destinasi.hasMany(Gambar, { foreignKey: 'id_destinasi' });

export default Gambar;