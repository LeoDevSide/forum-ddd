import { Either, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { Answer } from '../../enterprise/entities/answer.entity'
import { IAnswersRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseInputDto {
  instuctorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseOutputDto = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute({
    instuctorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseInputDto): Promise<AnswerQuestionUseCaseOutputDto> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instuctorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)
    return right({ answer })
  }
}
