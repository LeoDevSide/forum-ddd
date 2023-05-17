import { UniqueEntityID } from '../../src/core/entities/value-objects/unique-entity-id.value-object'
import {
  Answer,
  AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer.entity'
import { faker } from '@faker-js/faker'
export class ExampleAnswerEntityFactory {
  static create(
    override: Partial<AnswerProps> = {},
    id?: UniqueEntityID,
  ): Answer {
    const answer = Answer.create(
      {
        authorId: id ?? new UniqueEntityID(),
        content: faker.lorem.text(),
        questionId: id ?? new UniqueEntityID(),
        ...override,
      },
      id,
    )
    return answer
  }
}
