import { Question } from '../../enterprise/entities/question.entity'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
}
