import { SaveSensorRepository, UpdateSensorRepository, GetSensorsListRepository } from '@/data/protocols'
import { SensorModel } from './models'

export class SensorMongoRepository implements SaveSensorRepository, UpdateSensorRepository, GetSensorsListRepository {
    async save(data: SaveSensorRepository.Params): Promise<SaveSensorRepository.Result> {
        const result = await SensorModel.create(data)
        if (result.accountId) return result
        return null
    }

    async update(data: UpdateSensorRepository.Params): Promise<UpdateSensorRepository.Result> {
        const { sensorIdentification, sensorName, sensorEquipment, sensorMeasureType, sensorCurrentValue, sensorTimeStamp } = data
        const filter = { sensorIdentification }
        const update: any = { sensorName, sensorEquipment, sensorMeasureType, sensorCurrentValue, sensorTimeStamp }
        sensorName === undefined && delete update.sensorName
        sensorEquipment === undefined && delete update.sensorEquipment
        sensorMeasureType === undefined && delete update.sensorMeasureType
        sensorCurrentValue === undefined && delete update.sensorCurrentValue
        sensorTimeStamp === undefined && delete update.sensorTimeStamp
        const option = { new: true }
        const result = SensorModel.findOneAndUpdate(filter, update, option).lean()
        return result
    }

    async list(tenantId: string): Promise<GetSensorsListRepository.Result[]> {
        return await SensorModel.find({ tenantId })
    }
}

export namespace SensorMongoRepository {
    export type Params = SaveSensorRepository.Params
    export type Result = SaveSensorRepository.Result
}
