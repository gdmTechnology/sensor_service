import { adaptRoute } from '@/main/adapters'
import {
    makeCreateSensorController,
    makeUpdateSensorController,
    makeGetSensorsListController,
    makeGetSensorController
} from '@/main/factories'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/sensor', auth, adaptRoute(makeCreateSensorController()))
    router.put('/sensor/:sensorIdentification', auth, adaptRoute(makeUpdateSensorController()))
    router.get('/sensor', auth, adaptRoute(makeGetSensorsListController()))
    router.get('/sensor/:sensorIdentification', auth, adaptRoute(makeGetSensorController()))
}
