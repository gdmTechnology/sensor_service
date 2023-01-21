import { ValidationSpy } from '../mocks'
import { SensorController } from '@/presentation/controllers'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    sut: SensorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = new SensorController(validationSpy)
    return {
        validationSpy,
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
        const { sut } = mockSut()
        const request = mockRequest()
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
})
