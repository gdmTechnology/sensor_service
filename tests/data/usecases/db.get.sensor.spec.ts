import { DbGetSensor } from '@/data/usecases'
import { GetSensorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    getSensorRepositorySpy: GetSensorRepositorySpy
    sut: DbGetSensor
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const getSensorRepositorySpy = new GetSensorRepositorySpy()
    const sut = new DbGetSensor(getSensorRepositorySpy)
    return { sut, getSensorRepositorySpy }
}

const mockRequest = (): string => 'sensorIdentification'

describe('DbUpdateSensor', () => {
    test('Should call GetSensorRepositorySpy with correct values', async () => {
        const { sut, getSensorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getSensorRepositorySpy.params).toEqual(request)
    })

    test('Should return sensor if GetSensorRepositorySpy succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if GetSensorRepositorySpy throws', async () => {
        const { sut, getSensorRepositorySpy } = makeSut()
        jest.spyOn(getSensorRepositorySpy, 'get').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if GetSensorRepositorySpy fails', async () => {
        const { sut, getSensorRepositorySpy } = makeSut()
        getSensorRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
