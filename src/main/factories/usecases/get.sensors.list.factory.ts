import { GetSensorsList } from '@/domain/usecases'
import { DbGetSensorsList } from '@/data/usecases'
import { SensorMongoRepository } from '@/infra/db/mongodb'

export const makeGetSensorsList = (): GetSensorsList => {
    const sensorMongoRepository = new SensorMongoRepository()
    return new DbGetSensorsList(sensorMongoRepository)
}
