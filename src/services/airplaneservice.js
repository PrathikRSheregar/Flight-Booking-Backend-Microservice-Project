const CrudRepository = require('../repositories/crudrepo');
const AirplaneRepository = require('../repositories/airplanerepo');
const { Airplane } = require('../models');

const airplaneRepo = new AirplaneRepository();

async function createairplane(data) {
    try {
        const airplane = await airplaneRepo.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createairplane
};