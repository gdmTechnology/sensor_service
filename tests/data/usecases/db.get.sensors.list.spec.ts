import { DbGetSensorsList } from '@/data/usecases'
import { GetSensorsListRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    getSensorsListRepositorySpy: GetSensorsListRepositorySpy
    sut: DbGetSensorsList
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const getSensorsListRepositorySpy = new GetSensorsListRepositorySpy()
    const sut = new DbGetSensorsList(getSensorsListRepositorySpy)
    return { sut, getSensorsListRepositorySpy }
}

const mockRequest = (): string => 'tenantId'

describe('DbGetSensorsList', () => {
    test('Should call GetSensorsListRepository with correct values', async () => {
        const { sut, getSensorsListRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getSensorsListRepositorySpy.params).toBe('tenantId')
    })

    test('Should return sensor if GetSensorsListRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
        if (result.isSuccess()) {
            expect(result.value.length).toBeGreaterThanOrEqual(1)
        }
    })

    test('Should throw if GetSensorsListRepository throws', async () => {
        const { sut, getSensorsListRepositorySpy } = makeSut()
        jest.spyOn(getSensorsListRepositorySpy, 'list').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return empty array if GetSensorsListRepository not found sensors', async () => {
        const { sut, getSensorsListRepositorySpy } = makeSut()
        getSensorsListRepositorySpy.result = []
        const request = mockRequest()
        const result = await sut.handle(request)
        if (result.isSuccess()) {
            expect(result.value.length).toBe(0)
        }
    })
})
