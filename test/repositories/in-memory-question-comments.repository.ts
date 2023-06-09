import { PaginationParams } from '../../src/core/repositories/pagination-params'
import { IQuestionCommentsRepository } from '../../src/domain/forum/application/repositories/question-comments.repository'
import { QuestionComment } from '../../src/domain/forum/enterprise/entities/question-comment.entity'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.value === id)
    if (!questionComment) return null
    return questionComment
  }

  async delete(question: QuestionComment): Promise<void> {
    const commentIndexToRemove = this.items.findIndex(
      (item) => item.id.value === question.id.value,
    )
    this.items.splice(commentIndexToRemove, 1)
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questioncommentss = this.items
      .filter((item) => item.questionId.value === questionId)
      .slice((params.page - 1) * 20, params.page * 20)
    return questioncommentss
  }
}
