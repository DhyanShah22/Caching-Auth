const mongoose = require('mongoose');

const FacUser = require('../Models/courseModels')
const {
    getCache,
    setCache
} = require('../Services/redisServices')

const getUsers = async (req, res) => {
    try {
        console.log('Fetching users...');
        const cachedUsers = await getCache('users');
        if (cachedUsers) {
            console.log('Returning cached users:', cachedUsers); // Log cached data
            const parsedUsers = JSON.parse(cachedUsers);
            console.log('Parsed cached users:', parsedUsers); // Log parsed data
            return res.json(parsedUsers);
        }

        console.log('Fetching users from database...');
        const users = await FacUser.find({}).sort({ createdAt: -1 });
        
        console.log('Caching users...');
        await setCache('users', users);
        console.log('Cached users:', users); // Log users before caching
        return res.status(200).json(users);
    } catch (err) {
        console.error('Error in getUsers:', err); // Detailed logging
        res.status(500).send('Server Error');
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Not a valid DB id' });
        }

        const cachedUser = await getCache(`user:${id}`);
        if (cachedUser) {
            return res.json(JSON.parse(cachedUser));
        }

        const user = await FacUser.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        setCache(`user:${id}`, user);
        res.json(user);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Server Error');
    }
};

const createUser = async (req, res) => {
    try {
        const { Subject, Faculty } = req.body;
        const newUser = new FacUser({ Subject, Faculty });
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const { Subject, Faculty } = req.body;
        let user = await FacUser.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.Subject = Subject;
        user.Faculty = Faculty;

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Not a valid DB id' });
        }
        // Remove user
        const user = await FacUser.findOneAndDelete({_id: id})
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User removed' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};