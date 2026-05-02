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

async function getAirplane(id){
    try{
        const airplane = await airplaneRepository.get(id)
        if(!airplane) throw new Apperror('Cannot fetch data of airplane of given id',StatusCodes.NOT_FOUND);
        return airplane;
    }catch(error){
        if(error instanceof Apperror)
            throw error;
        throw new Apperror('Cannot fetch  data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id,data){
    try { 
        const updated_airplane = await airplaneRepository.update(id,data);
        if(updated_airplane[0] === 0) throw new Apperror('Cannot update airplane of given id',StatusCodes.NOT_FOUND);
        return updated_airplane;
    } catch (error) {
        if(error instanceof Apperror)
            throw error;
        throw new Apperror('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try{
        const response = await airplaneRepository.destroy(id);
        if(response === 0) throw new Apperror('Cannot delete airplane of given id',StatusCodes.NOT_FOUND);
        return response;
    }catch(error){
        if(error instanceof Apperror)
            throw error;
        throw new Apperror('Cannot delete airplane of given id',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createairplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    destroyAirplane
};