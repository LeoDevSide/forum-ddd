import { IQuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseInputDto {
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(input: DeleteQuestionUseCaseInputDto): Promise<void> {
    await this.questionsRepository.deleteById(input.questionId)
  }
}
