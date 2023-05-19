import { Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'
import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'
import { IQuestionsRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface CommentOnQuestionUseCaseInputDto {
  authorId: string
  content: string
  questionId: string
}
type CommentOnQuestionUseCaseOutputDto = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute(
    input: CommentOnQuestionUseCaseInputDto,
  ): Promise<CommentOnQuestionUseCaseOutputDto> {
    const question = await this.questionsRepository.findById(input.questionId)

    if (!question) return left(new ResourceNotFoundError())

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(input.authorId),
      questionId: new UniqueEntityID(input.questionId),
      content: input.content,
    })
    await this.questionCommentsRepository.create(questionComment)
    return right({ questionComment })
  }
}
