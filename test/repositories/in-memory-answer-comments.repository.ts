import { IAnswerCommentsRepository } from '../../src/domain/forum/application/repositories/answer-comments.repository'
import { AnswerComment } from '../../src/domain/forum/enterprise/entities/answer-comment.entity'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
