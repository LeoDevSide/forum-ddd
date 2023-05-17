import { UniqueEntityID } from '../../src/core/entities/value-objects/unique-entity-id.value-object'
import {
  Question,
  QuestionProps,
} from '../../src/domain/forum/enterprise/entities/question.entity'
import { faker } from '@faker-js/faker'
export class ExampleQuestionEntityFactory {
  static create(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityID,
  ): Question {
    const question = Question.create(
      {
        authorId: id ?? new UniqueEntityID(),
        content: faker.lorem.text(),
        title: faker.lorem.sentence(),
        ...override,
      },
      id,
    )
    return question
  }
}
