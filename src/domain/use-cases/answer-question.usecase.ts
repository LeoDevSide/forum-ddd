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
    const answer = new Answer({
      content,
      authorId: instuctorId,
      questionId,
    })

    await this.answersRepository.create(answer)
    return answer
  }
}
