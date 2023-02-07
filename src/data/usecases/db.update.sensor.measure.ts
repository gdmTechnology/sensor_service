import { UpdateSensorMeasure } from '@/domain/usecases'
import { UpdateSensorMeasureRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbUpdateSensorMeasure implements UpdateSensorMeasure {
    constructor(
        private readonly updateSensorMeasureRepository: UpdateSensorMeasureRepository
    ) { }

    async handle(data: UpdateSensorMeasure.Params): Promise<Either<ApplicationError, UpdateSensorMeasure.Result>> {
        const update = {
            sensorIdentification: data.sensorIdentification,
            sensorMeasureType: data.sensorMeasureType,
            sensorValue: data.sensorValue,
            sensorTimeStamp: data.sensorTimeStamp
        }
        const sensor = await this.updateSensorMeasureRepository.update(update)
        if (!sensor) {
            const appError = new ApplicationError(
                Constants.NotFoundSensor.error,
                Constants.NotFoundSensor.message
            )
            return error(appError)
        }
        return success(sensor)
    }
}
