import { CreateSensor } from '@/domain/usecases'
import { DbCreateSensor } from '@/data/usecases'
import { SensorMongoRepository } from '@/infra/db/mongodb'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'

export const makeCreateSensor = (): CreateSensor => {
    const uuidGeneratorAdapter = new UuidGeneratorAdapter()
    const sensorMongoRepository = new SensorMongoRepository()
    return new DbCreateSensor(uuidGeneratorAdapter, sensorMongoRepository)
}
