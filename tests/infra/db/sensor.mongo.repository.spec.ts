
import { SensorMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

const throwError = (): never => {
    throw new Error()
}
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
    sensorCurrentValue: 0,
    sensorTimeStamp: 'sensorMeasureType'
})

describe('SensorMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('save()', () => {
        test('Should return an sensor on success', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            const sensor = await sut.save(params)
            expect(sensor).toBeDefined()
        })

        test('Should throw if SensorMongoRepository throws', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            const promise = sut.save({ ...params, accountId: '' })
            await expect(promise).rejects.toThrow()
        })
    })

    describe('update()', () => {
        test('Should return a sensor updated on success', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            const sensor = await sut.save(params)
            const { sensorIdentification } = sensor
            const sensorUpdated = await sut.update({ sensorIdentification, sensorName: 'sensorNameUpdated' })
            console.log('sensorUpdated', sensorUpdated)
            expect(sensorUpdated.sensorName).toBe('sensorNameUpdated')
        })

        test('Should return null if update() fails', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            const result = await sut.update({ ...params, sensorIdentification: '' })
            expect(result).toBeNull()
        })

        test('Should throw if update() throws', async () => {
            const sut = makeSut()
            jest.spyOn(sut, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(throwError)))
            const params = createSensorParams()
            const promise = sut.update(params)
            await expect(promise).rejects.toThrow()
        })
    })
})
