import { success } from '@/domain/protocols'
import { GetSensor } from '@/domain/usecases'

export class GetSensorSpy implements GetSensor {
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

    async handle(sensorIdentification: string): Promise<any> {
        this.params = sensorIdentification
        return this.result
    }
}
