import { QuestionComment } from '../../enterprise/entities/question-comment.entity'
import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'

interface FetchQuestionCommentsUseCaseInputDto {
  questionId: string
  page: number
}
interface FetchQuestionCommentsUseCaseOutputDto {
  comments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questioncommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute(
    input: FetchQuestionCommentsUseCaseInputDto,
  ): Promise<FetchQuestionCommentsUseCaseOutputDto> {
    const comments = await this.questioncommentsRepository.findManyByQuestionId(
      input.questionId,
      {
        page: input.page,
      },
    )
    return { comments }
  }
}
