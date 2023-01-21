import { CreateSensor } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest } from '../helpers'

export class SensorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly createSensor: CreateSensor
    ) { }

    async handle(data: SensorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            await this.createSensor.handle(data)
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
