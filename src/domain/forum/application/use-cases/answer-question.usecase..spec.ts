import { Answer } from '../../enterprise/entities/answer.entity'
import { AnswersRepository } from '../repositories/answer-repository'
import { AnswerQuestionUseCase } from './answer-question.usecase'
import { expect, test } from 'vitest'

const fakeAnswerRepository: AnswersRepository = {
  create: async function (answer: Answer): Promise<void> {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    instuctorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('Nova resposta')
})
