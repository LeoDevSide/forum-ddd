import { Either, right } from '../../../../core/either'
import { Question } from '../../enterprise/entities/question.entity'
import { IQuestionsRepository } from '../repositories/question-repository'

interface FetchRecentQuestionsUseCaseInputDto {
  page: number
}
type FetchRecentQuestionsUseCaseOutputDto = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(
    input: FetchRecentQuestionsUseCaseInputDto,
  ): Promise<FetchRecentQuestionsUseCaseOutputDto> {
    const questions = await this.questionsRepository.findManyRecent({
      page: input.page,
    })
    return right({ questions })
  }
}
