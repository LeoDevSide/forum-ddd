import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments.usecase'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments.repository'
import { ExampleAnswerCommentEntityFactory } from '../../../../../test/factories/answer-comment.factory'
import { IAnswerCommentsRepository } from '../repositories/answer-comments.repository'

let inMemoryRepository: IAnswerCommentsRepository
let useCase: FetchAnswerCommentsUseCase
describe('Fetch answercomments UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerCommentsRepository()
    useCase = new FetchAnswerCommentsUseCase(inMemoryRepository)
  })

  it('should be able to list answercomments from a created answer ', async () => {
    await inMemoryRepository.create(
      ExampleAnswerCommentEntityFactory.create({
        answerId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleAnswerCommentEntityFactory.create({
        answerId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleAnswerCommentEntityFactory.create({
        answerId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleAnswerCommentEntityFactory.create({
        answerId: new UniqueEntityID('2'),
      }),
    )
    const { comments } = await useCase.execute({
      page: 1,
      answerId: '1',
    })
    expect(comments.length).toEqual(3)
  })
})
