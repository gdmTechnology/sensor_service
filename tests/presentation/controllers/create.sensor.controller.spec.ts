import { ValidationSpy, CreateSensorSpy, GetDeviceSpy } from '../mocks'
import { CreateSensorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    createSensorSpy: CreateSensorSpy
    getDeviceSpy: GetDeviceSpy
    sut: CreateSensorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const createSensorSpy = new CreateSensorSpy()
    const getDeviceSpy = new GetDeviceSpy()
    const sut = new CreateSensorController(validationSpy, createSensorSpy, getDeviceSpy)
    return {
        validationSpy,
        createSensorSpy,
        getDeviceSpy,
        sut
    }
}

const mockRequest = (): any => ({
    sensorIdentification: 'sensorIdentification',
    deviceIdentification: 'deviceIdentification',
    sensorTenantId: 'sensorTenantId',
    sensorName: 'sensorName',
    sensorEquipment: 'sensorEquipment',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 0,
    sensorTimeStamp: 'sensorMeasureType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})

describe('SensorController', () => {
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

    test('Should call CreateSensor with correct values', async () => {
        const { sut, createSensorSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(createSensorSpy.params).toEqual(request)
    })

    test('Should return 400 if CreateSensor fails', async () => {
        const { sut, createSensorSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        createSensorSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if CreateSensor succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if CreateSensor throws', async () => {
        const { sut, createSensorSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(createSensorSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call GetDevice with correct value', async () => {
        const { sut, getDeviceSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getDeviceSpy.params).toEqual(request.deviceIdentification)
    })

    test('Should return 400 if GetDevice fails', async () => {
        const { sut, getDeviceSpy } = mockSut()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        getDeviceSpy.result = error(appError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if GetDevice throws', async () => {
        const { sut, getDeviceSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(getDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
