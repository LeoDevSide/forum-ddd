import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { DeleteQuestionUseCase } from './delete-question.usecase'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: DeleteQuestionUseCase
describe('Delete Question UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new DeleteQuestionUseCase(inMemoryRepository)
  })

  it('should be able to delete a created question', async () => {
    const questionToDelete = ExampleQuestionEntityFactory.create({
      authorId: new UniqueEntityID('1'),
    })
    await inMemoryRepository.create(questionToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await useCase.execute({
      authorId: '1',
      questionId: questionToDelete.id.value,
    })
    expect(inMemoryRepository.items.length).toEqual(0)
  })

  it('should not be able to delete a question from different author', async () => {
    const questionToDelete = ExampleQuestionEntityFactory.create({
      authorId: new UniqueEntityID('2'),
    })
    await inMemoryRepository.create(questionToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await expect(
      useCase.execute({
        authorId: '1',
        questionId: questionToDelete.id.value,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
