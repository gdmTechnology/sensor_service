import { CreateSensorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeCreateSensor, makeLogControllerDecorator, makeCreateSensorValidation, makeGetDevice } from '@/main/factories'

export const makeCreateSensorController = (): Controller => {
    const controller = new CreateSensorController(makeCreateSensorValidation(), makeCreateSensor(), makeGetDevice())
    return makeLogControllerDecorator(controller)
}
