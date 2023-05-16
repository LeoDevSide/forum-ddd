import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseInputDto {
  instuctorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  execute({ instuctorId, questionId, content }: AnswerQuestionUseCaseInputDto) {
    const answer = new Answer({
      content,
      authorId: instuctorId,
      questionId,
    })

    return answer
  }
}
