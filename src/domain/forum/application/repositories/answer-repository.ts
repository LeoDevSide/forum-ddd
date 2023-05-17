import { Answer } from '../../enterprise/entities/answer.entity'

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
}
