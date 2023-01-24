import { success } from '@/domain/protocols'
import { UpdateSensor } from '@/domain/usecases'

export class UpdateSensorSpy implements UpdateSensor {
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

    async handle(data: UpdateSensor.Params): Promise<any> {
        this.params = data
        return this.result
    }
}
