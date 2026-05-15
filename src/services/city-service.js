const AppError=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories');
const cityRepo = new CityRepository();

async function createCity(data) {
    try { 
        const city = await cityRepo.create(data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeUniqueConstraintError')
        {
            let explanation=[];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }   
        throw new AppError('Cannot create a new city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id,data){
    try { 
        const updatedCity = await cityRepo.update(id,data);
        return updatedCity;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot update a city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyCity(id){
    try{
        const response = await cityRepo.destroy(id);
        return response;
    }catch(error){
        console.log(error);
        throw new AppError('Cannot delete city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports={
    createCity,
    updateCity,
    destroyCity
}