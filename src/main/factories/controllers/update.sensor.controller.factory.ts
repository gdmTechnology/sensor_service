import { UpdateSensorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeUpdateSensor, makeUpdateSensorValidation, makeLogControllerDecorator } from '@/main/factories'

export const makeUpdateSensorController = (): Controller => {
    const controller = new UpdateSensorController(makeUpdateSensorValidation(), makeUpdateSensor())
    return makeLogControllerDecorator(controller)
}
