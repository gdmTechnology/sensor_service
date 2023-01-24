import { UpdateSensor } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class UpdateSensorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateSensor: UpdateSensor
    ) { }

    async handle(data: UpdateSensorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const sensor = await this.updateSensor.handle(data)
            if (sensor.isError()) return badRequest(sensor.value.details)
            return ok(sensor.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UpdateSensorController {
    export interface Request {
        accountId: string
        sensorIdentification: string
        sensorTenantId: string
        sensorName?: string
        sensorEquipment?: string
        sensorMeasureType?: string
        sensorCurrentValue?: number
        sensorTimeStamp?: string
    }
}
