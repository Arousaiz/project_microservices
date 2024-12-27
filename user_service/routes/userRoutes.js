const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const repository = require('../database/repository');

const Repository = new repository();

router.get('/', middleware, async (req, res) => {
    try {
        const users = await Repository.get_user_by_email_or_username(req.body.email, req.body.username);
        if (users) {
            console.log(users);
            const usersToReturn = [];
            for (const user of users) {
                const userObj = {
                    id: user.id,
                    email: user.email
                }
                usersToReturn.push(userObj);
            }
            return res.status(200).json(usersToReturn);
        }
        return res.status(404).json({ error: 'Users not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', middleware, async (req, res) => {
    try {
        const user = await Repository.get_user_by_id(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({
            id: user.id,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/me', middleware, async (req, res) => {
    try {
        const user = await Repository.get_user_by_id(req.userId);
        return res.status(200).json({
            id: user.id,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;