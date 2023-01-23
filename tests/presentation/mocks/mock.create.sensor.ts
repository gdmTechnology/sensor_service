import { success } from '@/domain/protocols'
import { CreateSensor } from '@/domain/usecases'

export class CreateSensorSpy implements CreateSensor {
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

    async handle(data: CreateSensor.Params): Promise<any> {
        this.params = data
        return this.result
    }
}
