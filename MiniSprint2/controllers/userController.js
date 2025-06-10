const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
        return res.status(401).json({ message: 'The email or password is incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
        return res.status(401).json({ message: 'The email or password is incorrect' });
        }

        const token = jwt.sign(
        { id: user.id, email: user.email },
        'supersecret',
        { expiresIn: '1h' }
        );

        res.json({
        message: 'Succes',
        token
        });

    } catch (err) {
        res.status(500).json({ message: 'Loggin error', error: err.message });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const exists = await User.findOne({
            where: { email }
        });

        if (exists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message});
    }
};

module.exports = {
    login,
    register
};