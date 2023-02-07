import { Either, ApplicationError } from '@/domain/protocols'

export interface UpdateSensorMeasure {
    handle: (data: UpdateSensorMeasure.Params) => Promise<Either<ApplicationError, UpdateSensorMeasure.Result>>
}

export namespace UpdateSensorMeasure {
    export type Params = {
        sensorIdentification: string
        sensorMeasureType: string
        sensorValue: number
        sensorTimeStamp: string
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
