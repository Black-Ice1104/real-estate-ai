import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const secret = '1234556';

router.post('/register', [
    body('username').isLength({ min: 10}),
    body('password').isLength({ min: 10}),
    //body('role').optional().isIn(['user', 'admin'])
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password} = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        let errorMessage = '';
        if(error.code === 11000){
            errorMessage = 'duplicated username';
        }
        res.status(400).json({ error: errorMessage });
    }

});

router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt with:', req.body.username, req.body.password);
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'Did not find user!' });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            console.log('Password does not match for:', req.body.password);
            return res.status(401).json({ message: 'password incorrect' });
        }

        const token = jwt.sign(
            { userId: user._id, 
              username: user.username,
              role: user.role},
            secret,
            { expiresIn: '1h'}
        );

        res.json({
            message: 'Authentication successful',
            token
        });
    } catch (error) {
        res.send(error.message);
    }
});

// router.post('/logout', async(req, res) => {
//     try{
//         const token = req.headers.authorization.split(' ')[1];

//         const expiry = jwt.decode(token).exp;
        
//     }
// })
export default router;