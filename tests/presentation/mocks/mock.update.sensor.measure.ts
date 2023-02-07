import { success } from '@/domain/protocols'
import { UpdateSensorMeasure } from '@/domain/usecases'

export class UpdateSensorMeasureSpy implements UpdateSensorMeasure {
    params = null
    result = success({
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 0,
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    })

    async handle(data: UpdateSensorMeasure.Params): Promise<any> {
        this.params = data
        return this.result
    }
}
