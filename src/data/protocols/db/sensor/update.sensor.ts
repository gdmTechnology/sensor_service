import { UpdateSensor } from '@/domain/usecases'

export interface UpdateSensorRepository {
    update: (data: UpdateSensorRepository.Params) => Promise<UpdateSensorRepository.Result>
}

export namespace UpdateSensorRepository {
    export type Params = UpdateSensor.Params
    export type Result = UpdateSensor.Result | null
}
