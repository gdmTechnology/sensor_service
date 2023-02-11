import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CompareSensortypeValidation implements Validation {
  constructor(
    private readonly fieldName: string
  ) { }

  validate(input: any): Error {
    if (!['temperature', 'vibration'].includes(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
