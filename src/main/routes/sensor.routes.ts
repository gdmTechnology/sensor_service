import { adaptRoute } from '@/main/adapters'
import { makeCreateSensorController } from '@/main/factories'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/sensor', auth, adaptRoute(makeCreateSensorController()))
}
