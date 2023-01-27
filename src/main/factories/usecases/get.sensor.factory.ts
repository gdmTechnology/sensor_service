import { GetSensor } from '@/domain/usecases'
import { DbGetSensor } from '@/data/usecases'
import { SensorMongoRepository } from '@/infra/db/mongodb'

export const makeGetSensor = (): GetSensor => {
    const sensorMongoRepository = new SensorMongoRepository()
    return new DbGetSensor(sensorMongoRepository)
}
