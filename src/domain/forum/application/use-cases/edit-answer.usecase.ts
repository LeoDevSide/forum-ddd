import { IAnswersRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseInputDto {
  authorId: string
  answerId: string
  content: string
}

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute(input: EditAnswerUseCaseInputDto): Promise<void> {
    const answer = await this.answersRepository.findById(input.answerId)

    if (!answer) throw new Error('Answer not found')
    if (input.authorId !== answer.authorId) throw new Error('Not allowed')

    answer.updateContent(input.content)
    await this.answersRepository.save(answer)
  }
}
