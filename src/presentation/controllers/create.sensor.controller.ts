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
            const isValidate = this.validation.validate(data)
            if (!isValidate) return badRequest(isValidate)
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
