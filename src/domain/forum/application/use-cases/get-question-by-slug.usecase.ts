import { Either, left, right } from '../../../../core/either'
import { Question } from '../../enterprise/entities/question.entity'
import { IQuestionsRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface GetQuestionBySlugUseCaseInputDto {
  slug: string
}
type GetQuestionBySlugUseCaseOutputDto = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(
    input: GetQuestionBySlugUseCaseInputDto,
  ): Promise<GetQuestionBySlugUseCaseOutputDto> {
    const question = await this.questionsRepository.findBySlug(input.slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
