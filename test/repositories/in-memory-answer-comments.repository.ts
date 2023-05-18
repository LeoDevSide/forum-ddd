import { IAnswerCommentsRepository } from '../../src/domain/forum/application/repositories/answer-comments.repository'
import { AnswerComment } from '../../src/domain/forum/enterprise/entities/answer-comment.entity'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.value === id)
    if (!answerComment) return null
    return answerComment
  }

  async delete(answer: AnswerComment): Promise<void> {
    const commentIndexToRemove = this.items.findIndex(
      (item) => item.id.value === answer.id.value,
    )
    this.items.splice(commentIndexToRemove, 1)
  }
}
