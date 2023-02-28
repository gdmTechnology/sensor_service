import { GetDeviceRepository } from '@/data/protocols'

export class GetDeviceRepositorySpy implements GetDeviceRepository {
    params: any
    result: any = true

    async get(deviceIdentification: string): Promise<GetDeviceRepository.Result> {
        this.params = deviceIdentification
        return this.result
    }
}
