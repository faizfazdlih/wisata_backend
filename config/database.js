import { Sequelize } from 'sequelize';

const db = new Sequelize('katalog_wisata', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;