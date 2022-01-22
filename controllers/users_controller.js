const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.createUser = [body('email').isEmail().withMessage('Invalid Email Address'),
    body('name').isString().isLength({min: 3}).withMessage('Name is too short'),
    async (req, res, next) => {
        const {name, email, gender, dob} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        let checkUser = await User.findOne({where: {email: email}});


        if (checkUser) {
            return res.status(419).json({
                message: 'A user exists with the email address'
            })
        }

        User.create({
            name: name,
            email: email,
            gender: gender,
            dob: dob,
            password: bcrypt.hashSync('password', 2)
        }).then((user) => {
            return res.status(200).json({
                message: 'user created successfully', user: user
            })
        }).catch((error) => {
            return res.status(200).json({
                message: error
            })
        })

    }]


exports.getUsers = (req, res, next) => {
    let queryText = req.query.querytxt;
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then((users) => {
        let newusers = users;
        if (queryText) {
            newusers = users.filter((user) => {

                    if (user.name.includes(queryText) || user.email.includes(queryText)) {
                        return user;
                    }

                }
            )
        }
        return res.status(200).json({
            message: users.length > 0 ? 'users list' : 'No users found', users: newusers
        })
    }).catch((error) => {
        return res.status(200).json({
            message: error
        })
    })

}

exports.getUserById = async (req, res, next) => {
    let user = await User.findByPk(req.params.id);
    return res.status(user ? 200 : 404).json({
        message: user ? 'user fetched' : 'no existing user with such Id', user: user
    })
}

exports.updateUser = [
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('name').isString().isLength({min: 3}).withMessage('Name is too short'),
    async (req, res, next) => {
        const {name, email, gender, dob} = req.body;
        let user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        } else {

            let userWithCurrentEmail = await User.findOne({where: {email: email}});

            if (userWithCurrentEmail.id !== user.id) {
                return res.status(419).json({
                    message: 'The email address exists with another user'
                })
            }

            user.set({
                name,
                email,
                gender,
                dob
            });

            await user.save();

            return res.status(200).json({
                message: 'user saved successfully',
                user: user
            })
        }

    }
]

exports.deleteUser = async (req, res, next) => {
    let removedUser = await User.findByPk(req.params.id);
    if (!removedUser) {
        return res.status(404).json({
            message: 'user not found'
        })
    }
    await removedUser.destroy();

    return res.status(200).json({
        message: 'user deleted successfully',
        user: removedUser
    })


}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    let loggedInUser = await User.findOne({where: {email: email}});

    if (!loggedInUser) {
        return res.status(404).json({
            message: 'no user found with the email address'
        })
    }

    let match = await bcrypt.compare(password, loggedInUser.password);

    if (!match) {
        return res.status(401).json({
            message: 'password and email do not match'
        })
    }

    const token = jwt.sign({
        email: loggedInUser.email,
        userId: loggedInUser.id.toString()
    }, 'secret')

    delete loggedInUser['password'];

    return res.status(200).json({
        token,
        user: loggedInUser
    })
}


exports.registerUser = [body('email').isEmail().withMessage('Invalid Email Address'),
    body('name').isString().isLength({min: 3}).withMessage('Name is too short'),
    async (req, res, next) => {

        const {name, email, password} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        let registeringUser = await User.findOne({where: {email: email}});

        if (registeringUser) {
            return res.status(419).json({
                message: 'A user exists with the email address'
            })
        }

        let hashedPassword = bcrypt.hashSync(password, 2);

        User.create({
            name,
            email,
            password: hashedPassword
        }).then((user) => {
            return res.status(200).json({
                message: 'user created successfully', user: user
            })
        }).catch((error) => {
            return res.status(200).json({
                message: error
            })
        })

    }]




