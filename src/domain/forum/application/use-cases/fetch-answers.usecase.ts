import { Answer } from '../../enterprise/entities/answer.entity'
import { IAnswersRepository } from '../repositories/answer-repository'

interface FetchAnswersUseCaseInputDto {
  questionId: string
  page: number
}
interface FetchAnswersUseCaseOutputDto {
  answers: Answer[]
}

export class FetchAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute(
    input: FetchAnswersUseCaseInputDto,
  ): Promise<FetchAnswersUseCaseOutputDto> {
    const answers = await this.answersRepository.findManyByQuestionId(
      input.questionId,
      {
        page: input.page,
      },
    )
    return { answers }
  }
}
