import { GetSensorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeGetSensor, makeLogControllerDecorator, makeGetSensorValidation } from '@/main/factories'

export const makeGetSensorController = (): Controller => {
    const controller = new GetSensorController(makeGetSensorValidation(), makeGetSensor())
    return makeLogControllerDecorator(controller)
}
