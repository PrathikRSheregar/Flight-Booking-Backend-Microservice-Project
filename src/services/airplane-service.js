const {CrudRepository} = require('../repositories');
const {AirplaneRepository} = require('../repositories');
const AppError=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const airplaneRepo = new AirplaneRepository();

async function createAirplane(data) {
    try { 
        const airplane = await airplaneRepo.create(data);
        return airplane;
    } catch (error) {
        throw new AppError('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
        const airplanes = await airplaneRepo.getAll()
        return airplanes;
    }catch(error){
        throw new AppError('Cannot fetch all data of the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try{
        const airplane = await airplaneRepo.get(id)
        if(!airplane) throw new AppError('Cannot fetch data of airplane of given id',StatusCodes.NOT_FOUND);
        return airplane;
    }catch(error){
        if(error instanceof AppError)
            throw error;
        throw new AppError('Cannot fetch  data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id,data){
    try { 
        const updated_airplane = await airplaneRepo.update(id,data);
        if(updated_airplane[0] === 0) throw new AppError('Cannot update airplane of given id',StatusCodes.NOT_FOUND);
        return updated_airplane;
    } catch (error) {
        if(error instanceof AppError)
            throw error;
        throw new AppError('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try{
        const response = await airplaneRepo.destroy(id);
        if(response === 0) throw new AppError('Cannot delete airplane of given id',StatusCodes.NOT_FOUND);
        return response;
    }catch(error){
        if(error instanceof AppError)
            throw error;
        throw new AppError('Cannot delete airplane of given id',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    destroyAirplane
};