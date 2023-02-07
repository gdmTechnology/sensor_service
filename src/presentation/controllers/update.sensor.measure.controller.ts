import { UpdateSensorMeasure } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class UpdateSensorMeasureController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateSensorMeasure: UpdateSensorMeasure
    ) { }

    async handle(data: UpdateSensorMeasureController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const sensor = await this.updateSensorMeasure.handle(data)
            if (sensor.isError()) return badRequest(sensor.value.details)
            return ok(sensor.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UpdateSensorMeasureController {
    export interface Request {
        sensorIdentification: string
        sensorMeasureType: string
        sensorValue: number
        sensorTimeStamp: string
    }
}
