import { IQuestionCommentsRepository } from '../repositories/question-comments.repository'

interface DeleteQuestionCommentUseCaseInputDto {
  questionCommentId: string
  authorId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute(input: DeleteQuestionCommentUseCaseInputDto): Promise<void> {
    const commentQuestion = await this.questionCommentsRepository.findById(
      input.questionCommentId,
    )

    if (!commentQuestion) throw new Error('Comment-Question not found')
    if (input.authorId !== commentQuestion.authorId)
      throw new Error('Not allowed')

    await this.questionCommentsRepository.delete(commentQuestion)
  }
}
