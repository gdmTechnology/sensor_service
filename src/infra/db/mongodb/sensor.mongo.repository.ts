import { SaveSensorRepository, UpdateSensorRepository, GetSensorsListRepository, GetSensorRepository } from '@/data/protocols'
import { SensorModel } from './models'

export class SensorMongoRepository implements SaveSensorRepository, UpdateSensorRepository, GetSensorsListRepository, GetSensorRepository {
    async save(data: SaveSensorRepository.Params): Promise<SaveSensorRepository.Result> {
        const result = await SensorModel.create(data)
        if (result.accountId) return result
        return null
    }

    async update(data: UpdateSensorRepository.Params): Promise<UpdateSensorRepository.Result> {
        const { sensorIdentification, sensorName, sensorEquipment, sensorMeasureType, sensorTimeStamp, sensorValue } = data
        const filter = { sensorIdentification }
        const update: any = { sensorName, sensorEquipment, sensorMeasureType, sensorTimeStamp }
        sensorName === undefined && delete update.sensorName
        sensorEquipment === undefined && delete update.sensorEquipment
        sensorMeasureType === undefined && delete update.sensorMeasureType
        sensorValue === undefined && delete update.sensorValue
        sensorTimeStamp === undefined && delete update.sensorTimeStamp
        if (sensorValue) update.sensorCurrentValue = sensorValue
        const option = { new: true }
        const result = SensorModel.findOneAndUpdate(filter, update, option).lean()
        return result
    }

    async list(tenantId: string): Promise<GetSensorsListRepository.Result[]> {
        return await SensorModel.find({ tenantId })
    }

    async get(sensorIdentification: string): Promise<GetSensorRepository.Result> {
        return await SensorModel.findOne({ sensorIdentification })
    }
}

export namespace SensorMongoRepository {
    export type Params = SaveSensorRepository.Params
    export type Result = SaveSensorRepository.Result
}
