const CrudRepository = require('./crud-repository');
const { Flight,Airport,City,Airplane } = require('../models');

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
                as:'city'
            }]
        },
        {
            model: Airport,
            as: 'arrivalAirport',
            include: [{
                model: City,
                as:'city'
            }]
        }
    ]
    });
    return flights;
    }
}
module.exports = FlightRepository;