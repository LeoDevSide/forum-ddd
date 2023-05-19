import { Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'
import { IAnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { IAnswersRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface CommentOnAnswerUseCaseInputDto {
  authorId: string
  content: string
  answerId: string
}
type CommentOnAnswerUseCaseOutputDto = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute(
    input: CommentOnAnswerUseCaseInputDto,
  ): Promise<CommentOnAnswerUseCaseOutputDto> {
    const answer = await this.answersRepository.findById(input.answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(input.authorId),
      answerId: new UniqueEntityID(input.answerId),
      content: input.content,
    })
    await this.answerCommentsRepository.create(answerComment)
    return right({ answerComment })
  }
}
