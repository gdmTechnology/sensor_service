import { CreateSensor } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok } from '../helpers'

export class SensorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly createSensor: CreateSensor
    ) { }

    async handle(data: SensorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const sensor = await this.createSensor.handle(data)
            if (sensor.isError()) return badRequest(sensor.value.details)
            return ok(sensor.value)
        } catch (error) {
            return badRequest(error)
        }
    }
}

export namespace SensorController {
    export interface Request {
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: string
        sensorTimeStamp: string
    }
}
