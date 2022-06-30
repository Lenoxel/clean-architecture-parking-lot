import ParkingLot from "../entity/ParkingLot";
import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class GetParkingLot {
    parkingLotRepository: ParkingLotRepository;

    constructor(parkingLotRepository: ParkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    async execute(code: string): Promise<ParkingLot> {
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);

        if (!parkingLot) {
            throw new Error('Parking Lot not found');
        }

        return parkingLot;
    }
}