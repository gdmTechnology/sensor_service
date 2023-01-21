import { Controller, Validation } from '@/presentation/protocols'
import { badRequest } from '../helpers'

export class SensorController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: SensorController.Request): Promise<any> {
        const isValidate = this.validation.validate(data)
        if (!isValidate) return badRequest(isValidate)
    }
}

export namespace SensorController {
    export interface Request {
        sensorIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: string
        sensorTimeStamp: string
        createdAt: Date
        updatedAt: Date
    }
}
