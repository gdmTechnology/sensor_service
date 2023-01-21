import { Either, ApplicationError } from '@/domain/protocols'

export interface CreateSensor {
    handle: (data: CreateSensor.Params) => Promise<Either<ApplicationError, CreateSensor.Result>>
}

export namespace CreateSensor {
    export type Params = {
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: string
        sensorTimeStamp: string
    }

    export type Result = {
        sensorIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: string
        sensorTimeStamp: string
        createdAt: Date
        updateddAt: Date
    }
}
