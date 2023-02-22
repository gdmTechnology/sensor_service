import { UpdateSensorMeasure } from '@/domain/usecases'
import { DbUpdateSensorMeasure } from '@/data/usecases'
import { SensorMongoRepository } from '@/infra/db/mongodb'

export const makeUpdateSensorMeasure = (): UpdateSensorMeasure => {
    const sensorMongoRepository = new SensorMongoRepository()
    return new DbUpdateSensorMeasure(sensorMongoRepository)
}
