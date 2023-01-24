import { DbUpdateSensor } from '@/data/usecases'
import { UpdateSensor } from '@/domain/usecases'
import { UpdateSensorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    updateSensorRepositorySpy: UpdateSensorRepositorySpy
    sut: DbUpdateSensor
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const updateSensorRepositorySpy = new UpdateSensorRepositorySpy()
    const sut = new DbUpdateSensor(updateSensorRepositorySpy)
    return { sut, updateSensorRepositorySpy }
}

const mockRequest = (): UpdateSensor.Params => ({
    sensorTenantId: 'sensorTenantId',
    sensorIdentification: 'sensorIdentification',
    sensorName: 'sensorName',
    sensorEquipment: 'sensorEquipment',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 0,
    sensorTimeStamp: 'sensorTimeStamp'
})

describe('DbUpdateSensor', () => {
    test('Should call UpdateSensorRepository with correct values', async () => {
        const { sut, updateSensorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(updateSensorRepositorySpy.params).toEqual(request)
    })

    test('Should return sensor if UpdateSensorRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if UpdateSensorRepository throws', async () => {
        const { sut, updateSensorRepositorySpy } = makeSut()
        jest.spyOn(updateSensorRepositorySpy, 'update').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if UpdateSensorRepository fails', async () => {
        const { sut, updateSensorRepositorySpy } = makeSut()
        updateSensorRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
