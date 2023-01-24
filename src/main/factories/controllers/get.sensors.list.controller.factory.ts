import { GetSensorsListController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeGetSensorsList, makeLogControllerDecorator, makeGetSensorsListValidation } from '@/main/factories'

export const makeGetSensorsListController = (): Controller => {
    const controller = new GetSensorsListController(makeGetSensorsListValidation(), makeGetSensorsList())
    return makeLogControllerDecorator(controller)
}
