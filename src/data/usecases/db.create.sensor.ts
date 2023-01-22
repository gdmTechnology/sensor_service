import { CreateSensor } from '@/domain/usecases'
import { SaveSensorRepository, CreateUuid } from '@/data/protocols'
import { ApplicationError, Either } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbCreateSensor implements CreateSensor {
    constructor(
        private readonly createUuid: CreateUuid
        // private readonly saveSensorRepository: SaveSensorRepository
    ) { }

    async handle(data: CreateSensor.Params): Promise<any> {
        const sensorIdentification = this.createUuid.create()
        // const sensor = await this.saveSensorRepository.save({
        //     accountId: data.accountId,
        //     sensorName: data.sensorName
        // })
    }
}
