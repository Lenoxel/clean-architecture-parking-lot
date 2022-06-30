import EnterParkingLot from '../src/core/use-case/EnterParkingLot';
import GetParkingLot from '../src/core/use-case/GetParkingLot';
import ParkingLotRepositoryMemory from '../src/infra/repository/ParkingLotRepositoryMemory';
import ParkingLotRepositorySQL from '../src/infra/repository/ParkingLotRepositorySQL';

test.skip('Should get parking lot', async () => {
    // Concrete Repository - Memory
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();

    // Use Case
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    
    // Get Parking Lot
    const parkingLot = await getParkingLot.execute('shopping');

    expect(parkingLot.code).toBe('shopping');
});

test('Should enter parking lot', async () => {
    // Concrete Repository - Memory
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL();

    // Use Cases
    const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
    
    // Get Parking Lot
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
    // First test: parking lot is empty of cars
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    // Park one car into parking lot
    await enterParkingLot.execute('shopping', 'MMM-0002', new Date('2022-06-30T15:00:00'));

    // Get Parking Lot
    const parkingLotAfterEnter = await getParkingLot.execute('shopping');
    // Second test: parking lot has one car parked
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test.skip('Should be closed', async () => {
    // Concrete Repository - Memory
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();

    // Use Cases
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
    
    // Get Parking Lot
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
    // First test: parking lot is empty of cars
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute('shopping', 'MMM-0001', new Date('2022-06-30T23:00:00'));

    async function doEnterParkingLot() {
        await enterParkingLot.execute('shopping', 'MMM-0001', new Date('2022-06-30T23:00:00'));
    }

    // Trying to park one car into parking lot when it is closed
    expect(doEnterParkingLot).toThrowError(new Error('The parking lot is closed'));
});

test.skip('Should be full', async () => {
    // Concrete Repository - Memory
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();

    // Use Cases
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
    
    // Get Parking Lot
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
    // First test: parking lot is empty of cars
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    // Park five cars into parking lot when it is closed
    await enterParkingLot.execute('shopping', 'MMM-0001', new Date('2022-06-30T13:00:00'));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(1);
    await enterParkingLot.execute('shopping', 'MMM-0002', new Date('2022-06-30T13:00:00'));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(2);
    await enterParkingLot.execute('shopping', 'MMM-0003', new Date('2022-06-30T13:00:00'));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(3);
    await enterParkingLot.execute('shopping', 'MMM-0004', new Date('2022-06-30T13:00:00'));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(4);
    await enterParkingLot.execute('shopping', 'MMM-0005', new Date('2022-06-30T13:00:00'));
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(5);

    // Trying to park one car into parking lot when it is full
    expect(async () => {
        await enterParkingLot.execute('shopping', 'MMM-0006', new Date('2022-06-30T13:05:00'));
    }).toThrowError(new Error('The parking lot is full'));
});