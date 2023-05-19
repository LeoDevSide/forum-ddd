import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments.repository'
import { DeleteQuestionCommentUseCase } from './delete-comment-question.usecase'
import { ExampleQuestionCommentEntityFactory } from '../../../../../test/factories/question-comment.factory'

let inMemoryRepository: InMemoryQuestionCommentsRepository
let useCase: DeleteQuestionCommentUseCase
describe('Delete QuestionCommentComment UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionCommentsRepository()
    useCase = new DeleteQuestionCommentUseCase(inMemoryRepository)
  })

  it('should be able to delete a created question comment', async () => {
    const questionCommentToDelete = ExampleQuestionCommentEntityFactory.create()
    await inMemoryRepository.create(questionCommentToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    await useCase.execute({
      authorId: questionCommentToDelete.authorId,
      questionCommentId: questionCommentToDelete.id.value,
    })
    expect(inMemoryRepository.items.length).toEqual(0)
  })

  it('should not be able to delete a question comment from different author', async () => {
    const questionCommentToDelete = ExampleQuestionCommentEntityFactory.create({
      authorId: new UniqueEntityID('2'),
    })
    await inMemoryRepository.create(questionCommentToDelete)
    expect(inMemoryRepository.items.length).toEqual(1)

    const result = await useCase.execute({
      authorId: questionCommentToDelete.authorId,
      questionCommentId: questionCommentToDelete.id.value,
    })
    expect(result)
  })
})
