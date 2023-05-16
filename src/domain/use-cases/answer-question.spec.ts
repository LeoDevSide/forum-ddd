import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    content: 'Nova resposta',
    instuctorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('Nova resposta')
})
