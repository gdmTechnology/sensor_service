import { CreateSensor } from '@/domain/usecases'

export interface LoadSensorByNameRepository {
    load: (data: LoadSensorByNameRepository.Params) => Promise<LoadSensorByNameRepository.Result>
}

export namespace LoadSensorByNameRepository {
    export type Params = { accountId: string, sensorName: string }
    export type Result = CreateSensor.Result | null
}
