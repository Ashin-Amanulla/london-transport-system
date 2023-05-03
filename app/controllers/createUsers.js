
// Get the functions in the db.js file to use
const { query } = require('../services/db');



const  createUsers = async (email,password) => {
    // Check if the email already exists in the database
    const checkEmailSql = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
    const checkEmailParams = [email];
    const [rows] = await query(checkEmailSql, checkEmailParams);
console.log(rows);
    if (rows.length === 0 || rows.count === 0) {

    // Insert a new user into the database
    const insertUserSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const insertUserParams = [email, password];
    await query(insertUserSql, insertUserParams);
    }
    else{
        throw new Error('Email already exists');

    }


}

module.exports = createUsers