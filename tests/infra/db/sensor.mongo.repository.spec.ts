
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
    deviceIdentification: 'deviceIdentification',
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
    })

    describe('update()', () => {
        test('Should return a sensor updated on success', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            const sensor = await sut.save(params)
            const { sensorIdentification } = sensor
            const sensorUpdated = await sut.update({ sensorIdentification, sensorName: 'sensorNameUpdated' })
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

    describe('list()', () => {
        test('Should return a list of sensors on success', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            await sut.save(params)
            const sensorsList = await sut.list(params.sensorTenantId)
            expect(sensorsList.length).toBe(1)
        })

        test('Should return empty array if list() fails', async () => {
            const sut = makeSut()
            const result = await sut.list('any_tenantId')
            expect(result.length).toBe(0)
        })

        test('Should throw if list() throws', async () => {
            const sut = makeSut()
            jest.spyOn(sut, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(throwError)))
            const params = createSensorParams()
            const promise = sut.list(params.sensorTenantId)
            await expect(promise).rejects.toThrow()
        })
    })

    describe('get()', () => {
        test('Should return a a sensor on success', async () => {
            const sut = makeSut()
            const params = createSensorParams()
            await sut.save(params)
            const sensorsList = await sut.get(params.sensorIdentification)
            expect(sensorsList).toHaveProperty('sensorIdentification')
        })

        test('Should return null if get() fails', async () => {
            const sut = makeSut()
            const result = await sut.get('any_sensorIdentification')
            expect(result).toBeNull()
        })

        test('Should throw if get() throws', async () => {
            const sut = makeSut()
            jest.spyOn(sut, 'get').mockReturnValueOnce(new Promise((resolve, reject) => reject(throwError)))
            const params = createSensorParams()
            const promise = sut.get(params.sensorIdentification)
            await expect(promise).rejects.toThrow()
        })
    })
})
