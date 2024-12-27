const sequelize = require('./sequelize');
const { Op } = require("sequelize");

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

class Repository {
    async get_projects(userId) {
        const projects = (await sequelize.models.project.findAll({ where: { userId: userId } }));
        return projects;
    }

    async create_project(title, description, hours, userId, projectId) {
        const project = sequelize.models.project.build({ title: title, description: description, hours: hours, userId: userId, projectId: projectId, createdAt: Date.now(), updatedAt: Date.now() });
        await project.save();
        return project;
    }

    async update_project(id, title, description, hours) {
        const project = await sequelize.models.project.findOne({ where: { id: id } });
        if (title) project.title = title;
        if (description) project.description = description;
        if (hours) project.hours = hours;
        project.updatedAt = Date.now();
        await project.save();
        return project;
    }

    async delete_project(id) {
        const project = await sequelize.models.project.findOne({ where: { id: id } });
        await project.destroy();
        return project;
    }
}

module.exports = Repository;