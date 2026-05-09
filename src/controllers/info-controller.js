const { StatusCodes } = require('http-status-codes');

const info = (req, res) => {
    return res.status(StatusCodes.OK).send("api is alive");
};

module.exports = {
    info
};