import { UniqueEntityID } from '../../core/entities/value-objects/unique-entity-id.value-object'
import { Answer } from '../entities/answer.entity'
import { AnswersRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseInputDto {
  instuctorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    instuctorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseInputDto) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instuctorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)
    return answer
  }
}
