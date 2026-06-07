const CrudRepository = require('./crud-repository');
const { Flight,Airport,City,Airplane } = require('../models');
const {Sequelize, where} = require('sequelize');
const db=require('../models');
const {addRowLockOnFlights} = require('./queries');
class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
    async getAllFlights(filter,sortFilter){
    const flights = await this.model.findAll({
    where: filter,
    order: sortFilter,
    include: [
        {
            model:Airplane,
            required:true,
            as:'airplaneDetails'
        },
        {
            model: Airport,
            as: 'departureAirport',
            include: [{
                model: City,
                required:true,
                as:'city'
            }]
        },
        {
            model: Airport,
            as: 'arrivalAirport',
            include: [{
                model: City,
                required:true,
                as:'city'
            }]
        }
    ]
    });
    return flights;
    }
    async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();

    try {
        await db.sequelize.query(
            addRowLockOnFlights(flightId),
            { transaction }
        );

        if (dec === 'true') {
            await Flight.decrement('remainingSeats', {
                by: seats,
                where: {
                    id: flightId
                },
                transaction
            });
        } else {
            await Flight.increment('remainingSeats', {
                by: seats,
                where: {
                    id: flightId
                },
                transaction
            });
        }

        const updatedFlight = await Flight.findByPk(
            flightId,
            { transaction }
        );

        await transaction.commit();

        return updatedFlight;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
}
module.exports = FlightRepository;