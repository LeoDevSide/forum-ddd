import { IAnswersRepository } from '../repositories/answer-repository'
import { AnswerQuestionUseCase } from './answer-question.usecase'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'

let inMemoryRepository: IAnswersRepository
let useCase: AnswerQuestionUseCase
describe('Answer Question UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    useCase = new AnswerQuestionUseCase(inMemoryRepository)
  })

  it('should be able to create a question', async () => {
    const result = await useCase.execute({
      content: 'Nova resposta',
      instuctorId: '1',
      questionId: '1',
    })
    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.content).toEqual('Nova resposta')
    expect(result.value?.answer.id).toBeTruthy()
    expect(result.value?.answer.authorId).toEqual('1')
    expect(result.value?.answer.questionId).toEqual('1')
    expect(result.value?.answer.excerpt).toEqual('Nova resposta...')
    expect(result.value?.answer.createdAt).toBeTruthy()
  })
})
