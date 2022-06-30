import ParkedCar from '../entity/ParkedCar';
import ParkingLotRepository from '../repository/ParkingLotRepository';

export default class EnterParkingLot {
    parkingLotRepository: ParkingLotRepository;

    constructor(parkingLotRepository: ParkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    async execute(code: string, plate: string, date: Date) {
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        const { code: carCode, plate: carPlate, date: carDate } = new ParkedCar(code, plate, date);

        if (!parkingLot.isOpen(carDate)) {
            throw new Error('The parking lot is closed');
        }

        if (parkingLot.isFull()) {
            throw new Error('The parking lot is full');
        }

        await this.parkingLotRepository.parkCar(carCode, carPlate, carDate);

        return parkingLot;
    }
}