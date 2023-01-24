import { Either, ApplicationError } from '@/domain/protocols'

export interface UpdateSensor {
    handle: (data: UpdateSensor.Params) => Promise<Either<ApplicationError, UpdateSensor.Result>>
}

export namespace UpdateSensor {
    export type Params = {
        accountId: string
        sensorTenantId: string
        sensorIdentification: string
        sensorName?: string
        sensorEquipment?: string
        sensorMeasureType?: string
        sensorCurrentValue?: number
        sensorTimeStamp?: string
    }

    export type Result = {
        accountId: string
        sensorIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: number
        sensorTimeStamp: string
        createdAt: Date
        updatedAt: Date
    }
}
