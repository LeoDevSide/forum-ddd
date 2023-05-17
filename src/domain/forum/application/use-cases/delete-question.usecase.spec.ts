import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { DeleteQuestionUseCase } from './delete-question.usecase'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: DeleteQuestionUseCase
describe('Delete Question UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new DeleteQuestionUseCase(inMemoryRepository)
  })

  it('should be able to delete a created question', async () => {
    const questionToDelete = ExampleQuestionEntityFactory.create()
    await inMemoryRepository.create(questionToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await useCase.execute({ questionId: questionToDelete.id.value })
    expect(inMemoryRepository.items.length).toEqual(0)
  })
})
