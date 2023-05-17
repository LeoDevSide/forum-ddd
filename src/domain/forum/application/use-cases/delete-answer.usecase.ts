import { IAnswersRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseInputDto {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute(input: DeleteAnswerUseCaseInputDto): Promise<void> {
    const answer = await this.answersRepository.findById(input.answerId)

    if (!answer) throw new Error('Answer not found')
    if (input.authorId !== answer.authorId) throw new Error('Not allowed')
    await this.answersRepository.delete(answer)
  }
}
