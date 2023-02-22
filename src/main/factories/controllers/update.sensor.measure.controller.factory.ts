import { UpdateSensorMeasureController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeUpdateSensorMeasure, makeUpdateSensorMeasureValidation, makeLogControllerDecorator } from '@/main/factories'

export const makeUpdateSensorMeasureController = (): Controller => {
    const controller = new UpdateSensorMeasureController(makeUpdateSensorMeasureValidation(), makeUpdateSensorMeasure())
    return makeLogControllerDecorator(controller)
}
