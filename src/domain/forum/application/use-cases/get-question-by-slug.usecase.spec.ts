import { IQuestionsRepository } from '../repositories/question-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.usecase'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'

let inMemoryRepository: IQuestionsRepository
let useCase: GetQuestionBySlugUseCase
describe('Get Question by slug UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new GetQuestionBySlugUseCase(inMemoryRepository)
  })

  it('should be able to get a created question by slug', async () => {
    const questionEntity = ExampleQuestionEntityFactory.create({
      content: 'Example content',
      title: 'Title example',
    })
    await inMemoryRepository.create(questionEntity)

    expect(questionEntity.id).toBeTruthy()
    expect(questionEntity.content).toEqual('Example content')
    expect(questionEntity.title).toEqual('Title example')
    expect(questionEntity.slug).toEqual('title-example')
    expect(questionEntity.createdAt).toBeDefined()
    expect(questionEntity.excerpt).toEqual('Example content...')
    expect(questionEntity.isNew).toBe(true)
    expect(questionEntity.bestAnswerId).toBe(undefined)

    const { question } = await useCase.execute({
      slug: questionEntity.slug,
    })
    expect(question).toEqual(questionEntity)
    expect(question.slug).toEqual(questionEntity.slug)
  })
})
