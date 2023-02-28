import { ValidationSpy, GetSensorsListSpy } from '../mocks'
import { GetSensorsListController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    getSensorsListSpy: GetSensorsListSpy
    sut: GetSensorsListController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const getSensorsListSpy = new GetSensorsListSpy()
    const sut = new GetSensorsListController(validationSpy, getSensorsListSpy)
    return {
        validationSpy,
        getSensorsListSpy,
        sut
    }
}

const mockRequest = (): any => ({ sensorTenantId: 'sensorTenantId' })

describe('GetSensorsListController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual({ sensorTenantId: 'sensorTenantId' })
    })

    test('Should return 400 if validation fails', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call GetSensorsList with correct values', async () => {
        const { sut, getSensorsListSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getSensorsListSpy.params).toEqual('sensorTenantId')
    })

    test('Should return 400 if GetSensorsList fails', async () => {
        const { sut, getSensorsListSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        getSensorsListSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if GetSensorsList succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if GetSensorsList throws', async () => {
        const { sut, getSensorsListSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(getSensorsListSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
