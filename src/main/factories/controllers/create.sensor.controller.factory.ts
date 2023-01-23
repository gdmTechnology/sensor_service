import { CreateSensorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeCreateSensor, makeLogControllerDecorator, makeCreateSensorValidation } from '@/main/factories'

export const makeCreateSensorController = (): Controller => {
    const controller = new CreateSensorController(makeCreateSensorValidation(), makeCreateSensor())
    return makeLogControllerDecorator(controller)
}
