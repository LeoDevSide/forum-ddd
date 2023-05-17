import { UniqueEntityID } from '../../src/core/entities/value-objects/unique-entity-id.value-object'
import {
  Question,
  QuestionProps,
} from '../../src/domain/forum/enterprise/entities/question.entity'

export class ExampleQuestionEntityFactory {
  static create(override: Partial<QuestionProps> = {}): Question {
    const question = Question.create({
      authorId: new UniqueEntityID('1'),
      content: 'Example content',
      title: 'Title example',
      ...override,
    })
    return question
  }
}
