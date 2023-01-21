import { Controller, Validation } from '@/presentation/protocols'

export class SensorController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: SensorController.Request): Promise<any> {
        this.validation.validate(data)
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
