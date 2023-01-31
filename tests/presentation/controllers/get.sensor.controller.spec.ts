import { ValidationSpy, GetSensorSpy } from '../mocks'
import { GetSensorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    getSensorSpy: GetSensorSpy
    sut: GetSensorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const getSensorSpy = new GetSensorSpy()
    const sut = new GetSensorController(validationSpy, getSensorSpy)
    return {
        validationSpy,
        getSensorSpy,
        sut
    }
}

const mockRequest = (): any => ({ sensorIdentification: 'sensorIdentification' })

describe('GetSensorController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual({ sensorIdentification: 'sensorIdentification' })
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

    test('Should call GetSensor with correct values', async () => {
        const { sut, getSensorSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getSensorSpy.params).toEqual(request.sensorIdentification)
    })

    test('Should return 400 if GetSensor fails', async () => {
        const { sut, getSensorSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        getSensorSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if GetSensor succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if GetSensor throws', async () => {
        const { sut, getSensorSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(getSensorSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
