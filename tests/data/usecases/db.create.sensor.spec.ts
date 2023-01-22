import { DbCreateSensor } from '@/data/usecases'
import { CreateSensor } from '@/domain/usecases'
import { CreateUuidSpy, SaveSensorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    createUuidSpy: CreateUuidSpy
    saveSensorRepositorySpy: SaveSensorRepositorySpy
    sut: DbCreateSensor
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const saveSensorRepositorySpy = new SaveSensorRepositorySpy()
    const sut = new DbCreateSensor(createUuidSpy, saveSensorRepositorySpy)
    return { sut, createUuidSpy, saveSensorRepositorySpy }
}

const mockRequest = (): CreateSensor.Params => ({
    accountId: 'accountId',
    sensorTenantId: 'sensorTenantId',
    sensorName: 'sensorName',
    sensorEquipment: 'sensorEquipment',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 'sensorCurrentValue',
    sensorTimeStamp: 'sensorTimeStamp'
})

describe('DbCreateSensor', () => {
    test('Should throw if CreateUuid throws', async () => {
        const { sut, createUuidSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(createUuidSpy, 'create').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should call SaveSensorRepository with correct values', async () => {
        const { sut, saveSensorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(saveSensorRepositorySpy.params).toEqual({ ...request, sensorIdentification: 'any_id' })
    })
})
