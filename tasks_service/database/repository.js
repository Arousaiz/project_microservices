const sequelize = require('./sequelize');
const { Op } = require("sequelize");

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

class Repository {
    async get_tasks(userId) {
        const tasks = (await sequelize.models.task.findAll({ where: { userId: userId } }));
        return tasks;
    }

    async create_task(title, description, hours, userId, projectId) {
        const task = sequelize.models.task.build({ title: title, description: description, hours: hours, userId: userId, projectId: projectId, createdAt: Date.now(), updatedAt: Date.now() });
        await task.save();
        return task;
    }

    async update_task(id, title, description, hours) {
        const task = await sequelize.models.task.findOne({ where: { id: id } });
        if (title) task.title = title;
        if (description) task.description = description;
        if (hours) task.hours = hours;
        task.updatedAt = Date.now();
        await task.save();
        return task;
    }

    async delete_task(id) {
        const task = await sequelize.models.task.findOne({ where: { id: id } });
        await task.destroy();
        return task;
    }
}

module.exports = Repository;