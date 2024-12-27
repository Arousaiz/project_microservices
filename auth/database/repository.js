const sequelize = require('./sequelize');
const { hash_password } = require('../services/services');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

class Repository {
    async get_user_by_email(email) {
        const user = (await sequelize.models.user.findOne({ where: { email: email } }));
        return user;
    }

    async get_user_by_id(id) {
        const user = (await sequelize.models.user.findOne({ where: { id: id } }));
        return user;
    }

    async create_user(email, password, saltRounds) {
        const hashedPassword = await hash_password(password, saltRounds);
        const user = await sequelize.models.user.build({ email: email, passwordHash: hashedPassword });
        await user.save();
        return user;
    }
}

module.exports = Repository;