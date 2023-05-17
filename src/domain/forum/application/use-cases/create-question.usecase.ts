import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { Question } from '../../enterprise/entities/question.entity'
import { IQuestionsRepository } from '../repositories/question-repository'

interface CreateQuestionUseCaseInputDto {
  authorId: string
  content: string
  title: string
}
interface CreateQuestionUseCaseOutputDto {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(
    input: CreateQuestionUseCaseInputDto,
  ): Promise<CreateQuestionUseCaseOutputDto> {
    const question = Question.create({
      authorId: new UniqueEntityID(input.authorId),
      content: input.content,
      title: input.title,
    })

    await this.questionsRepository.create(question)
    return { question }
  }
}
