require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = {
    PORT:process.env.PORT||3500,
    JWT_SECRET,
    
}