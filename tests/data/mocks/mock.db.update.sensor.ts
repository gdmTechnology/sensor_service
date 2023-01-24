import { UpdateSensorRepository } from '@/data/protocols'

export class UpdateSensorRepositorySpy implements UpdateSensorRepository {
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

    async update(params: UpdateSensorRepository.Params): Promise<UpdateSensorRepository.Result> {
        this.params = params
        return this.result
    }
}
