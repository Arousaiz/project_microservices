const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const repository = require('../database/repository');

const Repository = new repository();

function getProject(project) {
    const projectObj = {
        id: project.id,
        title: project.title,
        description: project.description,
        hours: project.hours,
    }
    return projectObj;
}

router.get('/projects', middleware, async (req, res) => {
    try {
        const projects = await Repository.get_projects(req.userId);
        if (!projects) {
            return res.status(404).json({ error: 'Projects not found' });
        }
        const projectsToReturn = [];
        for (const project of projects) {
            const projectObj = getProject(project);
            projectsToReturn.push(projectObj);
        }
        return res.status(200).json(projectsToReturn);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/projects', middleware, async (req, res) => {
    try {
        if ((!req.body.title && !req.body.description) || !req.userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const project = await Repository.create_project(req.body.title, req.body.description, req.body.hours, req.userId);
        return res.status(201).json({ message: 'Project created successfully', projectId: project.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/projects/:id', middleware, async (req, res) => {
    try {
        const project = await Repository.update_project(req.params.id, req.body.title, req.body.description, req.body.hours);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.status(200).json({ message: 'Project updated successfully', projectId: project.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/projects/:id', middleware, async (req, res) => {
    try {
        const project = await Repository.delete_project(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.status(200).json({ message: 'Project deleted successfully', projectId: project.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;