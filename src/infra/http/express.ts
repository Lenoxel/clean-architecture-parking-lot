import express, { Router } from 'express';
import ExpressAdapter from '../../adapter/ExpressAdapter';
import ParkingLotController from '../../controller/ParkingLotController';

const app = express();

app.use(express.json())

const route = Router();

route.get('/parkingLots/:code', ExpressAdapter.create(ParkingLotController.getParkingLot));

app.use(route);

app.listen(3000, () => console.log('Server listening on port 3000'));