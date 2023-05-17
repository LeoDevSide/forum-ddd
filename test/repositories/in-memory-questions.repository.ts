import { PaginationParams } from '../../src/core/repositories/pagination-params'
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

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )
    if (questionIndex >= 0) {
      this.items[questionIndex] = question
    } // findIndex returns -1 when not found
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 20, params.page * 20)
    return questions
  }
}
