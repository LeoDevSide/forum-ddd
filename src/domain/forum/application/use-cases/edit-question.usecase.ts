import { Either, left, right } from '../../../../core/either'
import { IQuestionsRepository } from '../repositories/question-repository'
import { NotAllowedError } from './Errors/not-allowed.error'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface EditQuestionUseCaseInputDto {
  authorId: string
  questionId: string
  title: string
  content: string
}
type EditQuestionUseCaseOutputDto = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(
    input: EditQuestionUseCaseInputDto,
  ): Promise<EditQuestionUseCaseOutputDto> {
    const question = await this.questionsRepository.findById(input.questionId)

    if (!question) return left(new ResourceNotFoundError())
    if (input.authorId !== question.authorId.value)
      return left(new NotAllowedError())

    question.updateTitle(input.title)
    question.updateContent(input.content)
    await this.questionsRepository.save(question)
    return right({})
  }
}
