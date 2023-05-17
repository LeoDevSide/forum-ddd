import { beforeEach, describe, expect, it } from 'vitest'
import { FetchAnswersUseCase } from './fetch-answers.usecase'
import { IAnswersRepository } from '../repositories/answer-repository'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'
import { ExampleAnswerEntityFactory } from '../../../../../test/factories/answer.factory'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'

let inMemoryRepository: IAnswersRepository
let useCase: FetchAnswersUseCase
describe('Fetch answers UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    useCase = new FetchAnswersUseCase(inMemoryRepository)
  })

  it('should be able to list answers from a created question ', async () => {
    await inMemoryRepository.create(
      ExampleAnswerEntityFactory.create({
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleAnswerEntityFactory.create({
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleAnswerEntityFactory.create({
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleAnswerEntityFactory.create({
        questionId: new UniqueEntityID('2'),
      }),
    )
    const { answers } = await useCase.execute({ page: 1, questionId: '1' })
    expect(answers.length).toEqual(3)
  })
})
