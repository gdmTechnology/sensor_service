import { GetSensorsList } from '@/domain/usecases'

export interface GetSensorsListRepository {
    list: (tenantId: string) => Promise<GetSensorsListRepository.Result[]>
}

export namespace GetSensorsListRepository {
    export type Result = GetSensorsList.Result
}
