import { Either, left, right } from '../../../../core/either'
import { IAnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { NotAllowedError } from './Errors/not-allowed.error'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface DeleteAnswerCommentUseCaseInputDto {
  answerCommentId: string
  authorId: string
}

type DeleteAnswerCommentUseCaseOutputDto = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute(
    input: DeleteAnswerCommentUseCaseInputDto,
  ): Promise<DeleteAnswerCommentUseCaseOutputDto> {
    const commentAnswer = await this.answerCommentsRepository.findById(
      input.answerCommentId,
    )

    if (!commentAnswer) return left(new ResourceNotFoundError())
    if (input.authorId !== commentAnswer.authorId)
      return left(new NotAllowedError())

    await this.answerCommentsRepository.delete(commentAnswer)

    return right({})
  }
}
