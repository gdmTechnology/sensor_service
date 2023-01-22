import { CreateSensor } from '@/domain/usecases'
import { SaveSensorRepository, CreateUuid } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbCreateSensor implements CreateSensor {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly saveSensorRepository: SaveSensorRepository
    ) { }

    async handle(data: CreateSensor.Params): Promise<Either<ApplicationError, CreateSensor.Result>> {
        const sensorIdentification = this.createUuid.create()
        const sensor = await this.saveSensorRepository.save({ ...data, sensorIdentification })
        if (!sensor) {
            const appError = new ApplicationError(
                Constants.DuplicateError.error,
                Constants.DuplicateError.message
            )
            return error(appError)
        }
        return success(sensor)
    }
}
