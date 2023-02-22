import { UpdateSensorMeasure } from '@/domain/usecases'

export interface UpdateSensorMeasureRepository {
    updateMeasure: (data: UpdateSensorMeasureRepository.Params) => Promise<UpdateSensorMeasureRepository.Result>
}

export namespace UpdateSensorMeasureRepository {
    export type Params = Omit<UpdateSensorMeasure.Params, 'sensorValue'> & { sensorCurrentValue: number }
    export type Result = UpdateSensorMeasure.Result | null
}
