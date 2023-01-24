import { ValidationSpy, UpdateSensorSpy } from '../mocks'
import { UpdateSensorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    updateSensorSpy: UpdateSensorSpy
    sut: UpdateSensorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const updateSensorSpy = new UpdateSensorSpy()
    const sut = new UpdateSensorController(validationSpy, updateSensorSpy)
    return {
        validationSpy,
        updateSensorSpy,
        sut
    }
}

const mockRequest = (): any => ({
    sensorIdentification: 'sensorIdentification',
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

    test('Should call UpdateSensor with correct values', async () => {
        const { sut, updateSensorSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(updateSensorSpy.params).toEqual(request)
    })

    test('Should return 400 if UpdateSensor fails', async () => {
        const { sut, updateSensorSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        updateSensorSpy.result = error(appError)
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
        const { sut, updateSensorSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(updateSensorSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
