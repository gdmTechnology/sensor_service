import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeUpdateSensorMeasureValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['deviceIdentification', 'sensorIdentification', 'sensorMeasureType', 'sensorValue', 'sensorTimeStamp']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
