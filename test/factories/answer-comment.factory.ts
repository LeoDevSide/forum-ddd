import { UniqueEntityID } from '../../src/core/entities/value-objects/unique-entity-id.value-object'

import { faker } from '@faker-js/faker'
import {
  AnswerComment,
  AnswerCommentProps,
} from '../../src/domain/forum/enterprise/entities/answer-comment.entity'
export class ExampleAnswerCommentEntityFactory {
  static create(
    override: Partial<AnswerCommentProps> = {},
    id?: UniqueEntityID,
  ): AnswerComment {
    const answercomment = AnswerComment.create(
      {
        authorId: override.authorId ?? new UniqueEntityID(),
        content: faker.lorem.text(),
        answerId: override.answerId ?? new UniqueEntityID(),
        ...override,
      },
      id,
    )
    return answercomment
  }
}
