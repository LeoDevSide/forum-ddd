import { Question } from '../../enterprise/entities/question.entity'

export interface IQuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
}
