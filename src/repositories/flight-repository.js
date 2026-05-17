const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
    async getAllFlights(filter,sortFilter){
    const flights=await this.model.findAll({
        where:filter,
        order:sortFilter
    });
    return flights;
   }   
}
module.exports = FlightRepository;