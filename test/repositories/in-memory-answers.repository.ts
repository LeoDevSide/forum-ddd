import { PaginationParams } from '../../src/core/repositories/pagination-params'
import { IAnswersRepository } from '../../src/domain/forum/application/repositories/answer-repository'
import { Answer } from '../../src/domain/forum/enterprise/entities/answer.entity'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndexToRemove = this.items.findIndex(
      (item) => item.id.value === answer.id.value,
    )
    this.items.splice(answerIndexToRemove, 1)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => answer.id.value === id)
    if (!answer) return null
    return answer
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    if (answerIndex >= 0) {
      this.items[answerIndex] = answer
    } // findIndex returns -1 when not found
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId === questionId)
      .slice((params.page - 1) * 20, params.page * 20)
    return answers
  }
}
