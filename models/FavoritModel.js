import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Destinasi from './DestinasiModel.js';
import Pengguna from './PenggunaModel.js';

const { DataTypes } = Sequelize;

const Favorit = db.define('favorit', {
    id_favorit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pengguna: {
        type: DataTypes.INTEGER
    },
    id_destinasi: {
        type: DataTypes.INTEGER
    },
    tanggal_disimpan: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Favorit.belongsTo(Destinasi, { foreignKey: 'id_destinasi' });
Destinasi.hasMany(Favorit, { foreignKey: 'id_destinasi' });

Favorit.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pengguna.hasMany(Favorit, { foreignKey: 'id_pengguna' });

export default Favorit;