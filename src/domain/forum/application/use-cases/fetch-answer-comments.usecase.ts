import { Either, right } from '../../../../core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'
import { IAnswerCommentsRepository } from '../repositories/answer-comments.repository'

interface FetchAnswerCommentsUseCaseInputDto {
  answerId: string
  page: number
}
type FetchAnswerCommentsUseCaseOutputDto = Either<
  null,
  {
    comments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute(
    input: FetchAnswerCommentsUseCaseInputDto,
  ): Promise<FetchAnswerCommentsUseCaseOutputDto> {
    const comments = await this.answerCommentsRepository.findManyByAnswerId(
      input.answerId,
      {
        page: input.page,
      },
    )
    return right({ comments })
  }
}
