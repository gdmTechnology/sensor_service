import { UpdateSensorMeasure } from '@/domain/usecases'

export interface UpdateSensorMeasureRepository {
    update: (data: UpdateSensorMeasureRepository.Params) => Promise<UpdateSensorMeasureRepository.Result>
}

export namespace UpdateSensorMeasureRepository {
    export type Params = UpdateSensorMeasure.Params
    export type Result = UpdateSensorMeasure.Result | null
}
