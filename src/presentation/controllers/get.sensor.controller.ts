import { GetSensor } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class GetSensorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getSensor: GetSensor
    ) { }

    async handle({ sensorIdentification }: { sensorIdentification: string }): Promise<any> {
        try {
            const error = this.validation.validate({ sensorIdentification })
            if (error) return badRequest(error)
            const sensor = await this.getSensor.handle(sensorIdentification)
            if (sensor.isError()) return badRequest(sensor.value.details)
            return ok(sensor.value)
        } catch (error) {
            return serverError(error)
        }
    }
}
