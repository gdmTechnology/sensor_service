import { UpdateSensorMeasureRepository } from '@/data/protocols'

export class UpdateSensorMeasureRepositorySpy implements UpdateSensorMeasureRepository {
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

    async updateMeasure(params: UpdateSensorMeasureRepository.Params): Promise<UpdateSensorMeasureRepository.Result> {
        this.params = params
        return this.result
    }
}
