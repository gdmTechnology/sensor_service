import { Either, ApplicationError } from '@/domain/protocols'

export interface GetSensorsList {
    handle: (tenantId: string) => Promise<Either<ApplicationError, GetSensorsList.Result[]>>
}

export namespace GetSensorsList {
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
