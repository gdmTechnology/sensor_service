import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateSensorValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountId', 'sensorTenantId', 'sensorName', 'sensorEquipment', 'sensorMeasureType']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
