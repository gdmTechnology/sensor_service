import { faker } from '@faker-js/faker'
import { CompareSensortypeValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = faker.random.word()

const makeSut = (): CompareSensortypeValidation => {
  return new CompareSensortypeValidation(field)
}

describe('CompareSensorType Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'any_value' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'temperature' })
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'vibration' })
    expect(error).toBeFalsy()
  })
})
