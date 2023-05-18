import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments.usecase'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments.repository'
import { ExampleQuestionCommentEntityFactory } from '../../../../../test/factories/question-comment.factory'
import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'

let inMemoryRepository: IQuestionCommentsRepository
let useCase: FetchQuestionCommentsUseCase
describe('Fetch questioncomments UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionCommentsRepository()
    useCase = new FetchQuestionCommentsUseCase(inMemoryRepository)
  })

  it('should be able to list questioncomments from a created question ', async () => {
    await inMemoryRepository.create(
      ExampleQuestionCommentEntityFactory.create({
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleQuestionCommentEntityFactory.create({
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleQuestionCommentEntityFactory.create({
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryRepository.create(
      ExampleQuestionCommentEntityFactory.create({
        questionId: new UniqueEntityID('2'),
      }),
    )
    const { comments } = await useCase.execute({
      page: 1,
      questionId: '1',
    })
    expect(comments.length).toEqual(3)
  })
})
