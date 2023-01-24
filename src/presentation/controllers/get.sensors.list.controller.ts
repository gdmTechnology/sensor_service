import { GetSensorsList } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class GetSensorsListController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getSensorsList: GetSensorsList
    ) { }

    async handle(tenantId: string): Promise<any> {
        try {
            const error = this.validation.validate({ tenantId })
            if (error) return badRequest(error)
            const sensorsList = await this.getSensorsList.handle(tenantId)
            if (sensorsList.isError()) return badRequest(sensorsList.value.details)
            return ok(sensorsList.value)
        } catch (error) {
            return serverError(error)
        }
    }
}
