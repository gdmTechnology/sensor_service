import { GetSensor } from '@/domain/usecases'
import { GetSensorRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbGetSensor implements GetSensor {
    constructor(
        private readonly getSensorRepository: GetSensorRepository
    ) { }

    async handle(sensorIdentification: string): Promise<Either<ApplicationError, GetSensor.Result>> {
        const sensor = await this.getSensorRepository.get(sensorIdentification)
        if (!sensor) {
            const appError = new ApplicationError(
                Constants.NotFoundSensor.error,
                Constants.NotFoundSensor
            )
            return error(appError)
        }
        return success(sensor)
    }
}
