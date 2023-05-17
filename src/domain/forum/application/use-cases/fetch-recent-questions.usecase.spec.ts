import { IQuestionsRepository } from '../repositories/question-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions.usecase'

let inMemoryRepository: IQuestionsRepository
let useCase: FetchRecentQuestionsUseCase
describe('Fetch recent questions UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new FetchRecentQuestionsUseCase(inMemoryRepository)
  })

  it('should be able to get a created question by slug', async () => {
    await inMemoryRepository.create(
      ExampleQuestionEntityFactory.create({
        createdAt: new Date(2023, 0, 20),
      }),
    )
    await inMemoryRepository.create(
      ExampleQuestionEntityFactory.create({
        createdAt: new Date(2023, 0, 29),
      }),
    )
    await inMemoryRepository.create(
      ExampleQuestionEntityFactory.create({
        createdAt: new Date(2023, 0, 24),
      }),
    )
    const questionsP1 = await useCase.execute({
      page: 1,
    })

    expect(questionsP1.questions[0].createdAt).toEqual(new Date(2023, 0, 29))
    expect(questionsP1.questions[2].createdAt).toEqual(new Date(2023, 0, 20))
  })
})
