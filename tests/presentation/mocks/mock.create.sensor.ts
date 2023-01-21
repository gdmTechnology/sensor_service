import { ApplicationError, Either, success } from '@/domain/protocols'
import { CreateSensor } from '@/domain/usecases'

export class CreateSensorSpy implements CreateSensor {
    params = null
    result = {
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 'sensorCurrentValue',
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    }

    async handle(data: CreateSensor.Params): Promise<Either<ApplicationError, any>> {
        this.params = data
        return success(this.result)
    }
}
