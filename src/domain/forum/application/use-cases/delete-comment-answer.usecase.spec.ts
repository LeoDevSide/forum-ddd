import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments.repository'
import { DeleteAnswerCommentUseCase } from './delete-comment-answer.usecase'
import { ExampleAnswerCommentEntityFactory } from '../../../../../test/factories/answer-comment.factory'

let inMemoryRepository: InMemoryAnswerCommentsRepository
let useCase: DeleteAnswerCommentUseCase
describe('Delete AnswerCommentComment UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerCommentsRepository()
    useCase = new DeleteAnswerCommentUseCase(inMemoryRepository)
  })

  it('should be able to delete a created answer comment', async () => {
    const answerCommentToDelete = ExampleAnswerCommentEntityFactory.create()
    await inMemoryRepository.create(answerCommentToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await useCase.execute({
      authorId: answerCommentToDelete.authorId,
      answerCommentId: answerCommentToDelete.id.value,
    })
    expect(inMemoryRepository.items.length).toEqual(0)
  })

  it('should not be able to delete a answer comment from different author', async () => {
    const answerCommentToDelete = ExampleAnswerCommentEntityFactory.create({
      authorId: new UniqueEntityID('2'),
    })
    await inMemoryRepository.create(answerCommentToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await expect(
      useCase.execute({
        authorId: '1',
        answerCommentId: answerCommentToDelete.id.value,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
