import { IQuestionsRepository } from '../../src/domain/forum/application/repositories/question-repository'
import { Question } from '../../src/domain/forum/enterprise/entities/question.entity'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []
  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((question) => question.slug === slug)
    if (!question) return null
    return question
  }
}
