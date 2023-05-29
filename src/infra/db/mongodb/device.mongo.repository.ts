import {
    GetDeviceRepository,
    CreateDeviceRepository
} from '@/data/protocols'
import { DeviceModel } from './models'

export class DeviceMongoRepository implements
    GetDeviceRepository {
    async save(data: CreateDeviceRepository.Params): Promise<CreateDeviceRepository.Result | null> {
        const result = await DeviceModel.create(data)
        return result
    }

    async get(deviceIdentification: string): Promise<GetDeviceRepository.Result> {
        const device = await DeviceModel.findOne({ deviceIdentification }).lean()
        return !!device
    }
}
