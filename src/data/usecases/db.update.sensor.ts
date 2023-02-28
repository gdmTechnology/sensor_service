import { UpdateSensor } from '@/domain/usecases'
import { UpdateSensorRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbUpdateSensor implements UpdateSensor {
    constructor(
        private readonly updateSensorRepository: UpdateSensorRepository
    ) { }

    async handle(data: UpdateSensor.Params): Promise<Either<ApplicationError, UpdateSensor.Result>> {
        const sensor = await this.updateSensorRepository.update(data)
        if (!sensor) {
            const appError = new ApplicationError(
                Constants.NotFoundSensor.error,
                Constants.NotFoundSensor
            )
            return error(appError)
        } else if (sensor.code === 11000) {
            const appError = new ApplicationError(
                Constants.DuplicateError.error,
                Constants.DuplicateError
            )
            return error(appError)
        }
        return success(sensor)
    }
}
