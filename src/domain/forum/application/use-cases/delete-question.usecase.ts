import { IQuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseInputDto {
  authorId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(input: DeleteQuestionUseCaseInputDto): Promise<void> {
    const question = await this.questionsRepository.findById(input.questionId)

    if (!question) throw new Error('Question not found')
    if (input.authorId !== question.authorId.value)
      throw new Error('Not allowed')
    await this.questionsRepository.delete(question)
  }
}
