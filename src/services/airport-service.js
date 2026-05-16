const {CrudRepository} = require('../repositories');
const {AirportRepository} = require('../repositories');
const AppError=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const airportRepo = new AirportRepository();

async function createAirport(data) {
    try { 
        const airport = await airportRepo.create(data);
        return airport;
    } catch (error) {
        throw new AppError('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try{
        const airports = await airportRepo.getAll()
        return airports;
    }catch(error){
        throw new AppError('Cannot fetch all data of the airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try{
        const airport = await airportRepo.get(id)
        if(!airport) throw new AppError('Cannot fetch data of airport of given id',StatusCodes.NOT_FOUND);
        return airport;
    }catch(error){
        console.log(error);
        if(error instanceof AppError)
            throw error;
        throw new AppError('Cannot fetch  data of the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id,data){
    try { 
        const updated_airport = await airportRepo.update(id,data);
        if(updated_airport[0] === 0) throw new AppError('Cannot update airport of given id',StatusCodes.NOT_FOUND);
        return updated_airport;
    } catch (error) {
        if(error instanceof AppError)
            throw error;
        throw new AppError('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try{
        const response = await airportRepo.destroy(id);
        if(response === 0) throw new AppError('Cannot delete airport of given id',StatusCodes.NOT_FOUND);
        return response;
    }catch(error){
        console.log(error);
        if(error instanceof AppError)
            throw error;
        throw new AppError('Cannot delete airport of given id',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    destroyAirport
};