import { UniqueEntityID } from '../../src/core/entities/value-objects/unique-entity-id.value-object'

import { faker } from '@faker-js/faker'
import {
  QuestionComment,
  QuestionCommentProps,
} from '../../src/domain/forum/enterprise/entities/question-comment.entity'
export class ExampleQuestionCommentEntityFactory {
  static create(
    override: Partial<QuestionCommentProps> = {},
    id?: UniqueEntityID,
  ): QuestionComment {
    const questioncomment = QuestionComment.create(
      {
        authorId: override.authorId ?? new UniqueEntityID(),
        content: faker.lorem.text(),
        questionId: override.questionId ?? new UniqueEntityID(),
        ...override,
      },
      id,
    )
    return questioncomment
  }
}
