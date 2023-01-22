
import { SensorMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

const makeSut = (): SensorMongoRepository => {
    return new SensorMongoRepository()
}

const createSensorParams = (): SensorMongoRepository.Params => ({
    accountId: 'accountId',
    sensorTenantId: 'sensorTenantId',
    sensorIdentification: 'sensorIdentification',
    sensorName: 'sensorName',
    sensorEquipment: 'sensorEquipment',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 'sensorMeasureType',
    sensorTimeStamp: 'sensorMeasureType'
})

describe('SensorMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    test('Should return an account on success', async () => {
        const sut = makeSut()
        const params = createSensorParams()
        const sensor = await sut.save(params)
        expect(sensor).toBeDefined()
    })
})
