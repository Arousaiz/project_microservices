const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const repository = require('../database/repository');
const redis = require('redis');


function getTask(task) {
    const taskObj = {
        id: task.id,
        title: task.title,
        description: task.description,
        hours: task.hours,
    }
    return taskObj;
}


let redisClient;

(async () => {
    redisClient = redis.createClient({
        socket: {
            port: 6379,
            host: "redis"
        }
    });

    redisClient.on("error", (error) => console.log(error));

    await redisClient.connect();
})();

const Repository = new repository();

router.get('/tasks', middleware, async (req, res) => {
    try {
        const cacheResult = await redisClient.get(`tasks:${req.userId}`);
        let tasks;
        if (cacheResult) {
            return res.status(200).json(JSON.parse(cacheResult));;
        }
        else {
            tasks = await Repository.get_tasks(req.userId);
        }
        if (!tasks) {
            return res.status(404).json({ error: 'Tasks not found' });
        }
        const tasksToReturn = [];
        for (const task of tasks) {
            const taskObj = getTask(task);
            tasksToReturn.push(taskObj);
        }
        await redisClient.set(`tasks:${req.userId}`, JSON.stringify(tasksToReturn));
        return res.status(200).json(tasksToReturn);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/tasks', middleware, async (req, res) => {
    try {
        if ((!req.body.title && !req.body.description) || !req.userId || !req.body.projectId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const task = await Repository.create_task(req.body.title, req.body.description, req.body.hours, req.userId, req.body.projectId);
        await redisClient.del(`tasks:${req.userId}`);
        return res.status(201).json({ message: 'Task created successfully', taskId: task.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/tasks/:id', middleware, async (req, res) => {
    try {
        const task = await Repository.update_task(req.params.id, req.body.title, req.body.description, req.body.hours);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await redisClient.del(`tasks:${req.userId}`);
        return res.status(200).json({ message: 'Task updated successfully', taskId: task.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/tasks/:id', middleware, async (req, res) => {
    try {
        const task = await Repository.delete_task(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await redisClient.del(`tasks:${req.userId}`);
        return res.status(200).json({ message: 'Task deleted successfully', taskId: task.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;