import { ValidationSpy, CreateSensorSpy } from '../mocks'
import { SensorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    createSensorSpy: CreateSensorSpy
    sut: SensorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const createSensorSpy = new CreateSensorSpy()
    const sut = new SensorController(validationSpy, createSensorSpy)
    return {
        validationSpy,
        createSensorSpy,
        sut
    }
}

const mockRequest = (): any => ({
    sensorIdentification: 'sensorIdentification',
    sensorTenantId: 'sensorTenantId',
    sensorName: 'sensorName',
    sensorEquipment: 'sensorEquipment',
    sensorMeasureType: 'sensorMeasureType',
    sensorCurrentValue: 'sensorMeasureType',
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
        expect(httpResponse.statusCode).toBe(400)
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
        const result = await sut.handle(request)
        expect(result.statusCode).toBe(400)
    })
})
