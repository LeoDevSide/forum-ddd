import { Either, left, right } from '../../../../core/either'
import { IAnswersRepository } from '../repositories/answer-repository'
import { NotAllowedError } from './Errors/not-allowed.error'
import { ResourceNotFoundError } from './Errors/resource-not-found.error'

interface DeleteAnswerUseCaseInputDto {
  authorId: string
  answerId: string
}
type DeleteAnswerUseCaseOutputDto = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute(
    input: DeleteAnswerUseCaseInputDto,
  ): Promise<DeleteAnswerUseCaseOutputDto> {
    const answer = await this.answersRepository.findById(input.answerId)

    if (!answer) return left(new ResourceNotFoundError())
    if (input.authorId !== answer.authorId) return left(new NotAllowedError())
    await this.answersRepository.delete(answer)
    return right({})
  }
}
