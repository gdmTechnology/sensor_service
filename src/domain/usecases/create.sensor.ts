import { Either, ApplicationError } from '@/domain/protocols'

export interface CreateSensor {
    handle: (data: CreateSensor.Params) => Promise<Either<ApplicationError, CreateSensor.Result>>
}

export namespace CreateSensor {
    export type Params = {
        accountId: string
        deviceIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: number
        sensorTimeStamp: string
    }

    export type Result = {
        accountId: string
        deviceIdentification: string
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
