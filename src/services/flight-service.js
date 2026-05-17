const {CrudRepository} = require('../repositories');
const {FlightRepository} = require('../repositories');
const AppError=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const flightRepo = new FlightRepository();
const {Op} = require('sequelize');
async function createFlight(data) {
    try { 
        const flight = await flightRepo.create(data);
        return flight;
    } catch (error) {
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
module.exports = {
    createFlight,
    getAllFlights
};