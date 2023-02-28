import { SaveSensorRepository, UpdateSensorRepository, GetSensorsListRepository, GetSensorRepository, UpdateSensorMeasureRepository } from '@/data/protocols'
import { SensorModel } from './models'

export class SensorMongoRepository implements SaveSensorRepository, UpdateSensorRepository, GetSensorsListRepository, GetSensorRepository, UpdateSensorMeasureRepository {
    async save(data: SaveSensorRepository.Params): Promise<SaveSensorRepository.Result> {
        try {
            const result = await SensorModel.create(data)
            if (result.accountId) return result
            return null
        } catch (error) {
            return null
        }
    }

    async update(data: UpdateSensorRepository.Params): Promise<UpdateSensorRepository.Result> {
        try {
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
            const result = await SensorModel.findOneAndUpdate(filter, update, option).lean()
            return result
        } catch (error) {
            return error
        }
    }

    async updateMeasure(data: UpdateSensorMeasureRepository.Params): Promise<UpdateSensorMeasureRepository.Result> {
        const { deviceIdentification, sensorIdentification, sensorMeasureType, ...rest } = data
        const filter = { deviceIdentification, sensorIdentification }
        const update: any = rest
        const option = { new: true }
        const result = await SensorModel.findOneAndUpdate(filter, update, option).lean()
        return result
    }

    async list(sensorTenantId: string): Promise<GetSensorsListRepository.Result[]> {
        return await SensorModel.find({ sensorTenantId })
    }

    async get(sensorIdentification: string): Promise<GetSensorRepository.Result> {
        return await SensorModel.findOne({ sensorIdentification })
    }
}

export namespace SensorMongoRepository {
    export type Params = SaveSensorRepository.Params
    export type Result = SaveSensorRepository.Result
}
