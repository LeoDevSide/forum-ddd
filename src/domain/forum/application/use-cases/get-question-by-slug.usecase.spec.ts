import { IQuestionsRepository } from '../repositories/question-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.usecase'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { Question } from '../../enterprise/entities/question.entity'

let inMemoryRepository: IQuestionsRepository
let useCase: GetQuestionBySlugUseCase
describe('Get Question by slug UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new GetQuestionBySlugUseCase(inMemoryRepository)
  })

  it('should be able to create question', async () => {
    const questionEntity = Question.create({
      content: 'Alguem sabe resolver?',
      authorId: new UniqueEntityID('1'),
      title: 'Titulo da duvida',
    })
    await inMemoryRepository.create(questionEntity)

    expect(questionEntity.id).toBeTruthy()
    expect(questionEntity.content).toEqual('Alguem sabe resolver?')
    expect(questionEntity.title).toEqual('Titulo da duvida')
    expect(questionEntity.slug).toEqual('titulo-da-duvida')
    expect(questionEntity.createdAt).toBeDefined()
    expect(questionEntity.excerpt).toEqual('Alguem sabe resolver?...')
    expect(questionEntity.isNew).toBe(true)
    expect(questionEntity.bestAnswerId).toBe(undefined)

    const getQuestionBySlug = await useCase.execute({
      slug: questionEntity.slug,
    })
    expect({ getQuestionBySlug }).toEqual(questionEntity)
  })
})
