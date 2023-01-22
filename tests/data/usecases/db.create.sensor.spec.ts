import { DbCreateSensor } from '@/data/usecases'
import { CreateSensor } from '@/domain/usecases'
import { CreateUuidSpy } from '@/tests/data/mocks'

type SutTypes = {
    createUuidSpy: CreateUuidSpy
    sut: DbCreateSensor
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const sut = new DbCreateSensor(createUuidSpy)
    return { sut, createUuidSpy }
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
    // test('Should call LoadAccountByTokenRepository with correct values', async () => {
    //     const { sut, loadSensorByNameRepositorySpy } = makeSut()
    //     const request = mockRequest()
    //     await sut.handle(request)
    //     expect(loadSensorByNameRepositorySpy.params).toEqual({ accountId: request.accountId, sensorName: request.sensorName })
    // })
})
