import { GetSensorsList } from '@/domain/usecases'
import { GetSensorsListRepository } from '@/data/protocols'
import { ApplicationError, Either, success } from '@/domain/protocols'

export class DbGetSensorsList implements GetSensorsList {
    constructor(
        private readonly getSensorsListRepository: GetSensorsListRepository
    ) { }

    async handle(tenantId: string): Promise<Either<ApplicationError, GetSensorsList.Result[]>> {
        const sensors = await this.getSensorsListRepository.list(tenantId)
        return success(sensors)
    }
}
