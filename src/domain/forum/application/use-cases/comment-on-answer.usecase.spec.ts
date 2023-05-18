import { IAnswersRepository } from '../repositories/answer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'
import { CommentOnAnswerUseCase } from './comment-on-answer.usecase'
import { IAnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments.repository'
import { ExampleAnswerEntityFactory } from '../../../../../test/factories/answer.factory'

let inMemoryAnswersRepository: IAnswersRepository
let inMemoryAnswerCommentsRepository: IAnswerCommentsRepository
let useCase: CommentOnAnswerUseCase
describe('Create Answer UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    useCase = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to create a comment in a existent answer', async () => {
    const exampleAnswer = ExampleAnswerEntityFactory.create()
    inMemoryAnswersRepository.create(exampleAnswer)

    const { answerComment } = await useCase.execute({
      authorId: '1',
      content: 'This is a comment',
      answerId: exampleAnswer.id.value,
    })
    expect(answerComment.authorId).toEqual('1')
    expect(answerComment.content).toEqual('This is a comment')
    expect(answerComment.createdAt).toBeTruthy()
    expect(answerComment.id.value).toBeTruthy()
    expect(answerComment.answerId.value).toEqual(exampleAnswer.id.value)
    expect(answerComment.excerpt).toEqual('This is a comment...')
  })

  it('should not be able to create a comment in a inexistent answer', async () => {
    await expect(
      useCase.execute({
        authorId: '1',
        content: 'This is a comment',
        answerId: '22',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
