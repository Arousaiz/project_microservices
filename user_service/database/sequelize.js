const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        logging: false,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        define: {
            timestamps: false,
        },
    });

const modelDefiners = [
    require('../models/user'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

module.exports = sequelize;