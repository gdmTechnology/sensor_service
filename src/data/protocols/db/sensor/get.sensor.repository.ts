import { GetSensor } from '@/domain/usecases'

export interface GetSensorRepository {
    get: (sensorIdentification: string) => Promise<GetSensorRepository.Result>
}

export namespace GetSensorRepository {
    export type Result = GetSensor.Result | null
}
