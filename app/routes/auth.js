const express = require('express')
const router = express.Router();
const axios = require('axios'); //axios is used to make HTTP requests in NodeJs with the API
const path = require('path')
const checkUser = require('../controllers/checkUser')
const createUser = require('../controllers/createUsers')




//? Login check 

router.post('/login', async function (req, res) {
    try {
        let { email, password } = req.body;
        const rows = await checkUser(email, password);
        if (rows.length === 1) {
            req.session.email = email;
            res.status(200).redirect(`/personal/${email}`);  //* returning personal page
        }
        else {
            res.render('signin', { error: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

// signUp 
router.post('/signup', async function (req, res) {
    try {
        let { email, password } = req.body;
        await createUser(email, password);
        req.session.email = email;

        res.status(200).redirect(`/personal/${email}`);  //* returning personal page
    } catch (error) {
        console.log(error);
        res.render('signin', { error: 'Email already exists' });
    }
});


module.exports = router