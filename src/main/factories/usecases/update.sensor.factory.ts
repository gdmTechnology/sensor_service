import { UpdateSensor } from '@/domain/usecases'
import { DbUpdateSensor } from '@/data/usecases'
import { SensorMongoRepository } from '@/infra/db/mongodb'

export const makeUpdateSensor = (): UpdateSensor => {
    const sensorMongoRepository = new SensorMongoRepository()
    return new DbUpdateSensor(sensorMongoRepository)
}
