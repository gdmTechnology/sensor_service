import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetSensorsListValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['sensorTenantId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
