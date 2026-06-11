const CrudRepository = require('./crud-repository');
const { Flight,Airport,City,Airplane } = require('../models');
const {Sequelize, where} = require('sequelize');
const db=require('../models');
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

    const transaction = await db.sequelize.transaction({
        isolationLevel:
        db.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });
    console.log("flightId:", flightId);
    try {

        const flight = await Flight.findByPk(
            flightId,
            {
                transaction,
                lock: transaction.LOCK.UPDATE
            }
        );

        if (!flight) {
            throw new Error('Flight not found');
        }

        if (dec) {

            if (flight.remainingSeats < seats) {
                throw new Error('Not enough seats available');
            }

            await flight.decrement(
                'remainingSeats',
                {
                    by: seats,
                    transaction
                }
            );

        } else {

            await flight.increment(
                'remainingSeats',
                {
                    by: seats,
                    transaction
                }
            );
        }

        await transaction.commit();

        return await Flight.findByPk(flightId);

    } catch (error) {
        console.log(error);
        await transaction.rollback();
        throw error;
    }
}
}
module.exports = FlightRepository;