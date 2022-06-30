import fastify from 'fastify';
import FastifyAdapter from '../../adapter/FastifyAdapter';
import ParkingLotController from '../../controller/ParkingLotController';

const server = fastify();

server.get('/parkingLots/:code', FastifyAdapter.create(ParkingLotController.getParkingLot));

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`);
});