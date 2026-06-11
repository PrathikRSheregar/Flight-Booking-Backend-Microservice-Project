const {CrudRepository} = require('../repositories');
const {FlightRepository} = require('../repositories');
const AppError=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const flightRepo = new FlightRepository();
const {Airplane}=require('../models');
const {Op} = require('sequelize');
async function createFlight(data) {
    try { 
        const airplane = await Airplane.findByPk(data.airplaneId);
        data.remainingSeats = airplane.capacity;
        const flight = await flightRepo.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        throw new AppError('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAllFlights(query){
    try{
        const filter={};
        let sortFilter=[];
        if(query.trips){
            const [departureAirportId,arrivalAirportId]=query.trips.split('-');
            filter.departureAirportId=departureAirportId;
            filter.arrivalAirportId=arrivalAirportId;
        }
        if(query.price){
            const [minprice,maxprice]=query.price.split('-');
            filter.price={
                [Op.between]:[minprice,maxprice]
            }
        }
        if(query.travellers){
            filter.remainingSeats={
                [Op.gte]:query.travellers
            }
        }
        if(query.tripDate){
            const startDate=new Date(query.tripDate);
            startDate.setHours(0,0,0,0);
            const endDate=new Date(query.tripDate);
            endDate.setHours(23,59,59,999);
            filter.departureTime={
                [Op.between]:[startDate,endDate]
            }
        }
        if(query.sort){
            let params=query.sort.split(',');
            sortFilter=params.map((param)=>{
                const[field,order]=param.split('_');
                return [field,order];
            })
        }
        const flights=await flightRepo.getAllFlights(filter,sortFilter);
        return flights;
    }catch(error){
        console.log(error);
         throw new AppError('Some mistake in flight repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try{
        const flight = await flightRepo.get(id);
        return flight;
    } catch(error) {
        if(error.StatusCodes === StatusCodes.NOT_FOUND){
            throw new AppError('The flight you requested is not present',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot fetch data of all flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateSeats(data){
    try{
        const response=await flightRepo.updateRemainingSeats(data.flightId,data.seats,data.dec)
        return response;
    }catch(error){
        console.log(error);
        throw new AppError('Cannot update data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};