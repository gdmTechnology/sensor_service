import { CreateUuid, SaveSensorRepository } from '@/data/protocols'

export class CreateUuidSpy implements CreateUuid {
    id = 'any_id'

    create(): string {
        return this.id
    }
}
