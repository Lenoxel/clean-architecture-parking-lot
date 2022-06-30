import GetParkingLot from "../core/use-case/GetParkingLot";
import ParkingLotRepositorySQL from "../infra/repository/ParkingLotRepositorySQL";

export default class ParkingLotController {
    static async getParkingLot(params, body) {
        // Concrete Repository
        const parkingLotRepositorySQL = new ParkingLotRepositorySQL();

        // Use Case - GetParkingLot
		const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
		const parkingLot = await getParkingLot.execute(params.code);

		return parkingLot;
    }
}