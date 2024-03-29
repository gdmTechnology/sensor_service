import { CompareSensortypeValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateSensorValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountId', 'deviceIdentification', 'sensorTenantId', 'sensorName', 'sensorEquipment', 'sensorMeasureType']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareSensortypeValidation('sensorMeasureType'))
    return new ValidationComposite(validations)
}
