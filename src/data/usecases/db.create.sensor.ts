import { CreateSensor } from '@/domain/usecases'
import { LoadSensorByNameRepository } from '@/data/protocols'
import { ApplicationError, Either } from '@/domain/protocols'

export class DbCreateSensor implements CreateSensor {
    constructor(
        private readonly loadAccountByIdRepository: LoadSensorByNameRepository
    ) { }

    async handle(data: CreateSensor.Params): Promise<any> {
        await this.loadAccountByIdRepository.load({ accountId: data.accountId, sensorName: data.sensorName })
    }
}
