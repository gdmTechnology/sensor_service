import { CreateUuid, SaveSensorRepository } from '@/data/protocols'

export class CreateUuidSpy implements CreateUuid {
    id = 'any_id'

    create(): string {
        return this.id
    }
}

export class SaveSensorRepositorySpy implements SaveSensorRepository {
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

    async save(params: SaveSensorRepository.Params): Promise<SaveSensorRepository.Result> {
        this.params = params
        return this.result
    }
}
