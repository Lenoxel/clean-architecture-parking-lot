import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkedCar from "../../core/entity/ParkedCar";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {

    parkingLots = [
        {
            code: 'shopping',
            capacity: 15,
            open_hour: 8,
            close_hour: 22,
        },
    ];

    parkedCars = [];
   
    getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = this.parkingLots.find(parkingLot => parkingLot.code === code );
        const occupiedSpaces = this.parkedCars.length;

        const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces);

        return Promise.resolve(parkingLot);
    }

    // createParkingLot(code: string, capacity: number, openHour: number, closeHour: number): void {
    //     this.parkingLots.push({ code, capacity, open_hour: openHour, close_hour: closeHour });
    // }

    parkCar(code: string, plate: string, date: Date): void {
        this.parkedCars.push({ code, plate, date });
    }
}