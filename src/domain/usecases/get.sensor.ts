import { Either, ApplicationError } from '@/domain/protocols'

export interface GetSensor {
    handle: (sensorIdentification: string) => Promise<Either<ApplicationError, GetSensor.Result>>
}

export namespace GetSensor {
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
