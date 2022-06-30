import ParkingLot from "../entity/ParkingLot";

export default interface ParkingLotRepository {
    getParkingLot(code: string): Promise<ParkingLot>;
    // createParkingLot(code: string, capacity: number, openHour: number, closeHour: number): void;
    parkCar(code: string, plate: string, date: Date): void;
}