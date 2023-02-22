import { DbUpdateSensorMeasure } from '@/data/usecases'
import { UpdateSensorMeasure } from '@/domain/usecases'
import { UpdateSensorMeasureRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    updateSensorMeasureRepositorySpy: UpdateSensorMeasureRepositorySpy
    sut: DbUpdateSensorMeasure
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const updateSensorMeasureRepositorySpy = new UpdateSensorMeasureRepositorySpy()
    const sut = new DbUpdateSensorMeasure(updateSensorMeasureRepositorySpy)
    return { sut, updateSensorMeasureRepositorySpy }
}

const mockRequest = (): UpdateSensorMeasure.Params => ({
    deviceIdentification: 'deviceIdentification',
    sensorIdentification: 'sensorIdentification',
    sensorMeasureType: 'sensorMeasureType',
    sensorValue: 0,
    sensorTimeStamp: 'sensorTimeStamp'
})

describe('DbUpdateSensorMeasure', () => {
    test('Should call UpdateSensorMeasureRepository with correct values', async () => {
        const { sut, updateSensorMeasureRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        const params = { ...request, sensorCurrentValue: 0 }
        delete params.sensorValue
        expect(updateSensorMeasureRepositorySpy.params).toEqual(params)
    })

    test('Should return sensor if UpdateSensorMeasureRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if UpdateSensorMeasureRepository throws', async () => {
        const { sut, updateSensorMeasureRepositorySpy } = makeSut()
        jest.spyOn(updateSensorMeasureRepositorySpy, 'updateMeasure').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if UpdateSensorMeasureRepository fails', async () => {
        const { sut, updateSensorMeasureRepositorySpy } = makeSut()
        updateSensorMeasureRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
