const express = require('express')
const router = express.Router();
const axios = require('axios'); //axios is used to make HTTP requests in NodeJs with the API
const path = require('path')
const getRandomColor = require('../helpers/randomColor')
// Get the functions in the db.js file to use
const { query } = require('../services/db');
const getAllData = require('../controllers/getAlldata');
const isAuthenticated = require('../helpers/authentication');








//? First Page  router


router.get('/', async (req, res) => {
    try {

        const lines = await getAllData();

        res.render('index', { lines, getRandomColor }); // sending a function getRandom color to front end so that cards gets different color
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops! Something went wrong.');
    }
});



//? Router to find a line status in a specific line

router.get('/status', async (req, res) => {
    try {
        let line = req.query.line;
        let url = `https://api.tfl.gov.uk/Line/${line}/Status`; //API taken from line (4rth one)

        const response = await axios.get(url)

        const data = response.data //? we just want the data from the API . so filtering out the meta data such as network status, contents etc...


        const disruption = data.map(line => ({  // before sending data to front end we select the data we require, ignoring others.
            lineId: line.id,
            name: line.name,
            modeName: line.modeName,
            statusSeverityDescription: line.lineStatuses[0].statusSeverityDescription,
            reason: line.lineStatuses[0]?.reason,
            additionalInfo: line.lineStatuses[0].disruption?.additionalInfo,
            from: line.lineStatuses[0].validityPeriods[0]?.fromDate,
            to: line.lineStatuses[0].validityPeriods[0]?.toDate

        }));

        console.log(disruption)
        res.render('status', { disruption });  //* returning only json data of disruption.





    } catch (error) { //! if any error happens inside try block,  this block will catch it and return value as error
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//?SignIn page
router.get('/login', async (req, res) => {
    try {
        res.render('signin', { error: null });  //* returning only json data of disruption.
    } catch (error) { //! if any error happens inside try block,  this block will catch it and return value as error
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.use('/auth', require('./auth'))



router.get('/personal/:email',  async function (req, res) {
    try {
        const email = req.params.email;
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows;
        console.log('user', user.routes || [])
        let data = user.routes || []


        const lines = await getAllData();
        const dropDowns = lines.filter((line) => !data.some((r) => r === line.name))
        const selected = lines.filter((line) => data.some((r) => r === line.name))
        res.render('personal', { email: email, lines: selected, dropDowns: dropDowns, getRandomColor });  //* returning only json data of disruption.

    } catch (error) {
        console.log(error);
        res.send(error);
    }

});



router.post('/addRoute/:email', async (req, res) => {


    try {
        const { selectedRoute } = req.body;
        const email = req.params.email;
        // Get the user's current routes array from the database
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows;
        console.log('user', user.routes)

        const routes = user.routes || [];
        console.log('selected routes', routes)
        // Add the selected route to the user's routes array
        routes.push(selectedRoute);

        // Update the user's routes array in the database
        await query('UPDATE users SET routes = ? WHERE email = ?', [JSON.stringify(routes || null), email]);

        // Send a response indicating success
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


router.get('/deleteRoute/:email', async (req, res) => {


    try {
        const routeName = req.query.routeName;
        const email = req.params.email;
        console.log(routeName, email)
        // Get the user's current routes array from the database
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows;
        console.log('user', user.routes)

        let routes = user.routes || [];
        console.log('before routes', routes)
        // Delete the selected route to the user's routes array

        routes = routes.filter(e => e !== routeName)

        // Update the user's routes array in the database
        await query('UPDATE users SET routes = ? WHERE email = ?', [JSON.stringify(routes || null), email]);

        // Send a response indicating success
        res.status(200).redirect(`/personal/${email}`);  //* returning personal page
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


router.get('/logout', async (req, res) => {

    try {
        req.session.destroy();
        req.session = null; 
        res.sendStatus(200);
        } catch (error) {

        console.error(error);
        res.sendStatus(500);

    }
   
     
});


module.exports = router