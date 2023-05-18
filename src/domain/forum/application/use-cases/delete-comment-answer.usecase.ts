import { IAnswerCommentsRepository } from '../repositories/answer-comments.repository'

interface DeleteAnswerCommentUseCaseInputDto {
  answerCommentId: string
  authorId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute(input: DeleteAnswerCommentUseCaseInputDto): Promise<void> {
    const commentAnswer = await this.answerCommentsRepository.findById(
      input.answerCommentId,
    )

    if (!commentAnswer) throw new Error('Comment-Answer not found')
    if (input.authorId !== commentAnswer.authorId)
      throw new Error('Not allowed')

    await this.answerCommentsRepository.delete(commentAnswer)
  }
}
