import { Question } from '../../enterprise/entities/question.entity'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}
