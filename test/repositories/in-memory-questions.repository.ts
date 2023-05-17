import { IQuestionsRepository } from '../../src/domain/forum/application/repositories/question-repository'
import { Question } from '../../src/domain/forum/enterprise/entities/question.entity'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []
  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((question) => question.id.value === id)
    if (!question) return null
    return question
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((question) => question.slug === slug)
    if (!question) return null
    return question
  }

  async delete(question: Question): Promise<void> {
    const questionIndexToRemove = this.items.findIndex(
      (item) => item.id.value === question.id.value,
    )
    this.items.splice(questionIndexToRemove, 1)
  }
}
