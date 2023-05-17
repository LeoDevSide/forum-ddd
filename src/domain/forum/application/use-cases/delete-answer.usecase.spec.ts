import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'
import { DeleteAnswerUseCase } from './delete-answer.usecase'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { ExampleAnswerEntityFactory } from '../../../../../test/factories/answer.factory'

let inMemoryRepository: InMemoryAnswersRepository
let useCase: DeleteAnswerUseCase
describe('Delete Answer UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    useCase = new DeleteAnswerUseCase(inMemoryRepository)
  })

  it('should be able to delete a created answer', async () => {
    const answerToDelete = ExampleAnswerEntityFactory.create({
      authorId: new UniqueEntityID('1'),
    })
    await inMemoryRepository.create(answerToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await useCase.execute({
      authorId: '1',
      answerId: answerToDelete.id.value,
    })
    expect(inMemoryRepository.items.length).toEqual(0)
  })

  it('should not be able to delete a answer from different author', async () => {
    const answerToDelete = ExampleAnswerEntityFactory.create({
      authorId: new UniqueEntityID('2'),
    })
    await inMemoryRepository.create(answerToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await expect(
      useCase.execute({
        authorId: '1',
        answerId: answerToDelete.id.value,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
