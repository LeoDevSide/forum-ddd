import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'
import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'
import { IQuestionsRepository } from '../repositories/question-repository'

interface CommentOnQuestionUseCaseInputDto {
  authorId: string
  content: string
  questionId: string
}
interface CommentOnQuestionUseCaseOutputDto {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute(
    input: CommentOnQuestionUseCaseInputDto,
  ): Promise<CommentOnQuestionUseCaseOutputDto> {
    const question = await this.questionsRepository.findById(input.questionId)

    if (!question) throw new Error('Question not found')

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(input.authorId),
      questionId: new UniqueEntityID(input.questionId),
      content: input.content,
    })
    await this.questionCommentsRepository.create(questionComment)
    return { questionComment }
  }
}
