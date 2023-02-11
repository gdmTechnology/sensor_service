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
    deviceIdentification: 'deviceIdentification',
    sensorTenantId: 'sensorTenantId',
    sensorName: 'sensorName',
    sensorEquipment: 'sensorEquipment',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 0,
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

    test('Should return sensor if SaveSensorRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if SaveSensorRepository throws', async () => {
        const { sut, saveSensorRepositorySpy } = makeSut()
        jest.spyOn(saveSensorRepositorySpy, 'save').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if SaveSensorRepository fails', async () => {
        const { sut, saveSensorRepositorySpy } = makeSut()
        saveSensorRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
