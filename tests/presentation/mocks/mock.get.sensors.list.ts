import { success } from '@/domain/protocols'
import { GetSensorsList } from '@/domain/usecases'

export class GetSensorsListSpy implements GetSensorsList {
    params = null
    result = success([{
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 0,
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    }])

    async handle(tenantId: string): Promise<any> {
        this.params = tenantId
        return this.result
    }
}
