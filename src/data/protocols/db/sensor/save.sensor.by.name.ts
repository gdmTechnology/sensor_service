import { CreateSensor } from '@/domain/usecases'

export interface SaveSensorRepository {
    save: (data: SaveSensorRepository.Params) => Promise<SaveSensorRepository.Result>
}

export namespace SaveSensorRepository {
    export type Params = CreateSensor & { sensorIdentification: string }
    export type Result = CreateSensor.Result | null
}
