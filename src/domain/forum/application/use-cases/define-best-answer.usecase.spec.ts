import { IQuestionsRepository } from '../repositories/question-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions.repository'
import { ExampleQuestionEntityFactory } from '../../../../../test/factories/question.factory'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { DefineBestAnswerUseCase } from './define-best-answer.usecase'
import { IAnswersRepository } from '../repositories/answer-repository'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'
import { ExampleAnswerEntityFactory } from '../../../../../test/factories/answer.factory'

let inMemoryQuestionRepository: IQuestionsRepository
let inMemoryAnswerRepository: IAnswersRepository
let useCase: DefineBestAnswerUseCase
describe('Define Best Answer UseCase Unit Test', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()

    useCase = new DefineBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    )
  })

  it('author should be able to define a best answer from a question', async () => {
    const questionEntity = ExampleQuestionEntityFactory.create({
      authorId: new UniqueEntityID('1'),
    })
    await inMemoryQuestionRepository.create(questionEntity)

    expect(questionEntity.id).toBeTruthy()
    expect(questionEntity.authorId.value).toEqual('1')
    expect(questionEntity.bestAnswerId).toBe(undefined)

    const answerEntity = ExampleAnswerEntityFactory.create({
      questionId: questionEntity.id,
    })
    await inMemoryAnswerRepository.create(answerEntity)

    await useCase.execute({
      authorId: questionEntity.authorId.value,
      answerId: answerEntity.id.value,
    })

    const getUpdatedQuestion = await inMemoryQuestionRepository.findById(
      questionEntity.id.value,
    )
    expect(getUpdatedQuestion).toBeTruthy()
    expect(getUpdatedQuestion?.bestAnswerId).toBeTruthy()
    expect(getUpdatedQuestion?.bestAnswerId?.value).toEqual(
      answerEntity.id.value,
    )
  })

  it('should not be able to set best answer if you not are question author', async () => {
    const questionEntity = ExampleQuestionEntityFactory.create({
      authorId: new UniqueEntityID('1'),
    })
    await inMemoryQuestionRepository.create(questionEntity)

    expect(questionEntity.id).toBeTruthy()
    expect(questionEntity.authorId.value).toEqual('1')
    expect(questionEntity.bestAnswerId).toBe(undefined)

    const answerEntity = ExampleAnswerEntityFactory.create({
      questionId: questionEntity.id,
    })

    expect(
      useCase.execute({
        authorId: '2',
        answerId: answerEntity.id.value,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
