const CrudRepository = require('../repositories/crudrepository');
const AirplaneRepository = require('../repositories/airplanerepository');
const Apperror=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const airplaneRepository = new AirplaneRepository();

async function createairplane(data) {
    try { 
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw new Apperror('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
        const airplanes = await airplaneRepository.getAll()
        return airplanes;
    }catch(error){
        throw new Apperror('Cannot fetch all data of the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createairplane,
    getAirplanes
};