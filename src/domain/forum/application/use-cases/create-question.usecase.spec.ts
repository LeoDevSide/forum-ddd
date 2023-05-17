import { IQuestionsRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question.usecase'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'

let inMemoryRepository: IQuestionsRepository
let useCase: CreateQuestionUseCase
describe('Create Question UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new CreateQuestionUseCase(inMemoryRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await useCase.execute({
      content: 'Alguem sabe resolver?',
      authorId: '1',
      title: 'Titulo da duvida',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Alguem sabe resolver?')
    expect(question.title).toEqual('Titulo da duvida')
    expect(question.slug).toEqual('titulo-da-duvida')
    expect(question.createdAt).toBeDefined()
    expect(question.excerpt).toEqual('Alguem sabe resolver?...')
    expect(question.isNew).toBe(true)
    expect(question.bestAnswerId).toBe(undefined)
  })
})
