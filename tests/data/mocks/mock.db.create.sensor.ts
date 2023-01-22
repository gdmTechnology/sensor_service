import { LoadSensorByNameRepository } from '@/data/protocols'

export class LoadSensorByNameRepositorySpy implements LoadSensorByNameRepository {
    params: any
    result: any = {
        accountId: 'accountId',
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 'sensorCurrentValue',
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'sensorTimeStamp'
    }

    async load(params: any): Promise<LoadSensorByNameRepository.Result> {
        this.params = params
        return this.result
    }
}
