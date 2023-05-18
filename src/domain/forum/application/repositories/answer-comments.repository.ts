import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
}
