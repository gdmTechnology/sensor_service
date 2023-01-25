import { GetSensorRepository } from '@/data/protocols'

export class GetSensorRepositorySpy implements GetSensorRepository {
    params: any
    result: any = {
        accountId: 'accountId',
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 0,
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    }

    async get(sensorIdentification: string): Promise<GetSensorRepository.Result> {
        this.params = sensorIdentification
        return this.result
    }
}
