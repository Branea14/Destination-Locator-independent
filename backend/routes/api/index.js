// backend/routes/api/index.js
const router = require('express').Router();
const {User} = require('/Users/andrewlizon/Desktop/Weeks_23-24/aa12-authenticate-me/Destination-Locator/backend/db/models');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

// router.get('/tests', (req, res) => {
//     res.json('hello world');
// })

router.post('/login', async (req,res, next) => {
try {
    const {credentials, password} = req.body
    const user = await User.findOne({
        where: {
            [Op.or]: [
                {username: credentials},
                {email: credentials}
            ]
        }
    })
    const isSamePassword = await bcrypt.compareSync(password, user.hashedPassword);


    const token = jwt.sign({id: user.id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    if (isSamePassword) {
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: process.env.JWT_EXPIRES_IN
        })
        res.json({
            id: user.id, 
            username: user.username, 
            email: user.email
        })
    }
} catch (error) {
    next(error)
}
})


router.post('/signup', async (req, res, next) => {
    const {username, email , password} = req.body;
    const saltedAndHashedPassword = await bcrypt.hashSync(password);
    const newUser = await User.create({username, email, hashedPassword: saltedAndHashedPassword});
    const token = jwt.sign({id: newUser.id, username: newUser.username, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    if (newUser) {
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: process.env.JWT_EXPIRES_IN
        })
        res.json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        })
    }
})

router.post('/logout', async (req, res, next) => {
    res.clearCookie('token');
    res.json("Logout successful")
})

module.exports = router;
