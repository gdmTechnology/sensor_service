import { DbCreateSensor } from '@/data/usecases'
import { CreateSensor } from '@/domain/usecases'
import { LoadSensorByNameRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    loadSensorByNameRepositorySpy: LoadSensorByNameRepositorySpy
    sut: DbCreateSensor
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const loadSensorByNameRepositorySpy = new LoadSensorByNameRepositorySpy()
    const sut = new DbCreateSensor(loadSensorByNameRepositorySpy)
    return { sut, loadSensorByNameRepositorySpy }
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
    test('Should call LoadAccountByTokenRepository with correct ciphertext', async () => {
        const { sut, loadSensorByNameRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(loadSensorByNameRepositorySpy.params).toEqual({ accountId: request.accountId, sensorName: request.sensorName })
    })
})
