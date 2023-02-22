import { ValidationSpy, UpdateSensorMeasureSpy } from '../mocks'
import { UpdateSensorMeasureController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    updateSensorMeasureSpy: UpdateSensorMeasureSpy
    sut: UpdateSensorMeasureController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const updateSensorMeasureSpy = new UpdateSensorMeasureSpy()
    const sut = new UpdateSensorMeasureController(validationSpy, updateSensorMeasureSpy)
    return {
        validationSpy,
        updateSensorMeasureSpy,
        sut
    }
}

const mockRequest = (): any => ({
    deviceIdentification: 'deviceIdentification',
    sensorIdentification: 'sensorIdentification',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 0,
    sensorTimeStamp: 'sensorMeasureType'
})

describe('UpdateSensorMeasureController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
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

    test('Should call UpdateSensor with correct values', async () => {
        const { sut, updateSensorMeasureSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(updateSensorMeasureSpy.params).toEqual(request)
    })

    test('Should return 400 if UpdateSensor fails', async () => {
        const { sut, updateSensorMeasureSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        updateSensorMeasureSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if UpdateSensor succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if UpdateSensor throws', async () => {
        const { sut, updateSensorMeasureSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(updateSensorMeasureSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
