import { Answer } from '../entities/answer'

interface AnswerQuestionUseCaseInputDto {
  instuctorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({ instuctorId, questionId, content }: AnswerQuestionUseCaseInputDto) {
    const answer = new Answer({
      content,
      authorId: instuctorId,
      questionId,
    })

    return answer
  }
}
