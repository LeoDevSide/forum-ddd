import { QuestionComment } from '../../enterprise/entities/question-comment.entity'

export interface IQuestionCommentsRepository {
  create(questioncomment: QuestionComment): Promise<void>
}
