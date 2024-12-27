const sequelize = require('./sequelize');
const { Op } = require("sequelize");

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

class Repository {
    async get_user_by_id(id) {
        const user = await sequelize.models.user.findOne({ where: { id: id } });
        console.log(user);
        return user;
    }

    async get_user_by_email_or_username(email, username) {
        if (email == null && username == null) return null;
        if (email == null && username != null) return (await sequelize.models.user.findAll({ where: { username: { [Op.like]: `%${username}%` } } }));
        if (email != null && username == null) return (await sequelize.models.user.findAll({ where: { email: { [Op.like]: `%${email}%` } } }));
        const user = (await sequelize.models.user.findAll({ where: { [Op.or]: [{ username: { [Op.like]: `%${username}%` } }, { email: { [Op.like]: `%${email}%` } }] } }));
        return user;
    }
}

module.exports = Repository;