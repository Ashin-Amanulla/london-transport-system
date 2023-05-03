
// Get the functions in the db.js file to use
const { query } = require('../services/db');



const checkUser = async (email, password) => {
    // Check if the email already exists in the database
    try {
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const params = [email, password];
        const rows = await query(sql, params);

        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }



}

module.exports = checkUser