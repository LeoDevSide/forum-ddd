import { IQuestionCommentsRepository } from '../../src/domain/forum/application/repositories/question-comments.repository'
import { QuestionComment } from '../../src/domain/forum/enterprise/entities/question-comment.entity'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
