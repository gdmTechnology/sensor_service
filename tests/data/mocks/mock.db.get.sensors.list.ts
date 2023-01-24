import { GetSensorsListRepository } from '@/data/protocols'

export class GetSensorsListRepositorySpy implements GetSensorsListRepository {
    params: any
    result: any = [{
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
    }]

    async list(tenantId: string): Promise<GetSensorsListRepository.Result[]> {
        this.params = tenantId
        return this.result
    }
}
