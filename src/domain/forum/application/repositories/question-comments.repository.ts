import { QuestionComment } from '../../enterprise/entities/question-comment.entity'

export interface IQuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
}
