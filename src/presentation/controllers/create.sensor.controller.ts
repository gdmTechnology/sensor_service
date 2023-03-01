import { CreateSensor, GetDevice } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class CreateSensorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly createSensor: CreateSensor,
        private readonly getDevice: GetDevice
    ) { }

    async handle(data: CreateSensorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const device = await this.getDevice.handle(data.deviceIdentification)
            if (device.isError()) return badRequest(device.value.details)

            const sensor = await this.createSensor.handle(data)
            if (sensor.isError()) return badRequest(sensor.value.details)
            return ok(sensor.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateSensorController {
    export interface Request {
        accountId: string
        deviceIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: number
        sensorTimeStamp: string
    }
}
