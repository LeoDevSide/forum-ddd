import { IQuestionsRepository } from '../repositories/question-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { CommentOnQuestionUseCase } from './comment-on-question.usecase'
import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments.repository'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'

let inMemoryQuestionsRepository: IQuestionsRepository
let inMemoryQuestionCommentsRepository: IQuestionCommentsRepository
let useCase: CommentOnQuestionUseCase
describe('Create Question UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    useCase = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to create a comment in a existent question', async () => {
    const exampleQuestion = ExampleQuestionEntityFactory.create()
    inMemoryQuestionsRepository.create(exampleQuestion)

    const { questionComment } = await useCase.execute({
      authorId: '1',
      content: 'This is a comment',
      questionId: exampleQuestion.id.value,
    })
    expect(questionComment.authorId).toEqual('1')
    expect(questionComment.content).toEqual('This is a comment')
    expect(questionComment.createdAt).toBeTruthy()
    expect(questionComment.id.value).toBeTruthy()
    expect(questionComment.questionId.value).toEqual(exampleQuestion.id.value)
    expect(questionComment.excerpt).toEqual('This is a comment...')
  })

  it('should not be able to create a comment in a inexistent question', async () => {
    await expect(
      useCase.execute({
        authorId: '1',
        content: 'This is a comment',
        questionId: '22',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
