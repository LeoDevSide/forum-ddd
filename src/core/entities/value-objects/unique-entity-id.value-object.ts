import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private _value: string
  get value(): string {
    return this._value
  }

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }
}
