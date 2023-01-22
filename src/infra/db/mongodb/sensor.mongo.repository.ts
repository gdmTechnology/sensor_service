import { SaveSensorRepository } from '@/data/protocols'
import { SensorModel } from './models'

export class SensorMongoRepository implements SaveSensorRepository {
    async save(data: SaveSensorRepository.Params): Promise<SaveSensorRepository.Result> {
        const model = new SensorModel(data)
        const result = await model.save()
        if (result.accountId) return result
        return null
    }
}

export namespace SensorMongoRepository {
    export type Params = SaveSensorRepository.Params
    export type Result = SaveSensorRepository.Result
}
