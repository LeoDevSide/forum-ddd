import { Either, left, right } from '../../../../core/either'
import { IAnswersRepository } from '../repositories/answer-repository'
import { NotAllowedError } from './Errors/not-allowed.error'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface EditAnswerUseCaseInputDto {
  authorId: string
  answerId: string
  content: string
}
type EditAnswerUseCaseOutputDto = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute(
    input: EditAnswerUseCaseInputDto,
  ): Promise<EditAnswerUseCaseOutputDto> {
    const answer = await this.answersRepository.findById(input.answerId)

    if (!answer) return left(new ResourceNotFoundError())
    if (input.authorId !== answer.authorId) return left(new NotAllowedError())
    answer.updateContent(input.content)
    await this.answersRepository.save(answer)
    return right({})
  }
}
