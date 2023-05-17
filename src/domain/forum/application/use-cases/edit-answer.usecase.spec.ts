import { IAnswersRepository } from '../repositories/answer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'
import { ExampleAnswerEntityFactory } from '../../../../../test/factories/answer.factory'
import { EditAnswerUseCase } from './edit-answer.usecase'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'

let inMemoryRepository: IAnswersRepository
let useCase: EditAnswerUseCase
describe('Edit Answer UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    useCase = new EditAnswerUseCase(inMemoryRepository)
  })

  it('should be able to get a created answer by slug', async () => {
    const answerEntity = ExampleAnswerEntityFactory.create({
      content: 'Example content',
      authorId: new UniqueEntityID('1'),
    })
    await inMemoryRepository.create(answerEntity)

    expect(answerEntity.id).toBeTruthy()
    expect(answerEntity.content).toEqual('Example content')
    expect(answerEntity.createdAt).toBeDefined()
    expect(answerEntity.excerpt).toEqual('Example content...')

    await useCase.execute({
      authorId: answerEntity.authorId,
      answerId: answerEntity.id.value,
      content: 'Edited content',
    })

    const getUpdatedEntity = await inMemoryRepository.findById(
      answerEntity.id.value,
    )
    expect(getUpdatedEntity).toBeTruthy()
    expect(getUpdatedEntity?.content).toEqual('Edited content')
    expect(getUpdatedEntity?.excerpt).toEqual('Edited content...')
  })

  it('should not be able to update a answer from different users', async () => {
    const answerEntity = ExampleAnswerEntityFactory.create({
      content: 'Example content',
      authorId: new UniqueEntityID('2'),
    })
    await inMemoryRepository.create(answerEntity)
    await expect(
      useCase.execute({
        authorId: '3',
        answerId: answerEntity.id.value,
        content: 'Edited content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
