import { IQuestionsRepository } from '../repositories/question-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'
import { EditQuestionUseCase } from './edit-question.usecase'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'

let inMemoryRepository: IQuestionsRepository
let useCase: EditQuestionUseCase
describe('Edit Question UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    useCase = new EditQuestionUseCase(inMemoryRepository)
  })

  it('should be able to get a created question by slug', async () => {
    const questionEntity = ExampleQuestionEntityFactory.create({
      content: 'Example content',
      title: 'Title example',
      authorId: new UniqueEntityID('1'),
    })
    await inMemoryRepository.create(questionEntity)

    expect(questionEntity.id).toBeTruthy()
    expect(questionEntity.content).toEqual('Example content')
    expect(questionEntity.title).toEqual('Title example')
    expect(questionEntity.slug).toEqual('title-example')
    expect(questionEntity.createdAt).toBeDefined()
    expect(questionEntity.excerpt).toEqual('Example content...')
    expect(questionEntity.isNew).toBe(true)
    expect(questionEntity.bestAnswerId).toBe(undefined)

    await useCase.execute({
      authorId: questionEntity.authorId.value,
      questionId: questionEntity.id.value,
      content: 'Edited content',
      title: 'Edited title',
    })

    const getUpdatedEntity = await inMemoryRepository.findById(
      questionEntity.id.value,
    )
    expect(getUpdatedEntity).toBeTruthy()
    expect(getUpdatedEntity?.content).toEqual('Edited content')
    expect(getUpdatedEntity?.title).toEqual('Edited title')
    expect(getUpdatedEntity?.slug).toEqual('edited-title')
    expect(getUpdatedEntity?.excerpt).toEqual('Edited content...')
  })
})
