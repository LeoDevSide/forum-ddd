import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'

export interface IAnswerCommentsRepository {
  create(answercomment: AnswerComment): Promise<void>
}
