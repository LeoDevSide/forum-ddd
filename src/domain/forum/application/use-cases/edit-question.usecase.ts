import { IQuestionsRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseInputDto {
  authorId: string
  questionId: string
  title: string
  content: string
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(input: EditQuestionUseCaseInputDto): Promise<void> {
    const question = await this.questionsRepository.findById(input.questionId)

    if (!question) throw new Error('Question not found')
    if (input.authorId !== question.authorId.value)
      throw new Error('Not allowed')

    question.updateTitle(input.title)
    question.updateContent(input.content)
    await this.questionsRepository.save(question)
  }
}
