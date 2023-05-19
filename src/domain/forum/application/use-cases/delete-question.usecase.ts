import { Either, left, right } from '../../../../core/either'
import { IQuestionsRepository } from '../repositories/question-repository'
import { NotAllowedError } from './Errors/not-allowed.error'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface DeleteQuestionUseCaseInputDto {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseOutputDto = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>
export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(
    input: DeleteQuestionUseCaseInputDto,
  ): Promise<DeleteQuestionUseCaseOutputDto> {
    const question = await this.questionsRepository.findById(input.questionId)

    if (!question) return left(new ResourceNotFoundError())
    if (input.authorId !== question.authorId.value)
      return left(new NotAllowedError())
    await this.questionsRepository.delete(question)
    return right({})
  }
}
