import { Either, left, right } from '../../../../core/either'
import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'
import { NotAllowedError } from './Errors/not-allowed.error'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface DeleteQuestionCommentUseCaseInputDto {
  questionCommentId: string
  authorId: string
}

type DeleteQuestionCommentUseCaseOutputDto = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute(
    input: DeleteQuestionCommentUseCaseInputDto,
  ): Promise<DeleteQuestionCommentUseCaseOutputDto> {
    const commentQuestion = await this.questionCommentsRepository.findById(
      input.questionCommentId,
    )

    if (!commentQuestion) return left(new ResourceNotFoundError())
    if (input.authorId !== commentQuestion.authorId)
      return left(new NotAllowedError())

    await this.questionCommentsRepository.delete(commentQuestion)
    return right({})
  }
}
