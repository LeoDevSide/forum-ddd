import { Question } from '../../enterprise/entities/question.entity'
import { IQuestionsRepository } from '../repositories/question-repository'

interface GetQuestionBySlugUseCaseInputDto {
  slug: string
}
interface GetQuestionBySlugUseCaseOutputDto {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute(
    input: GetQuestionBySlugUseCaseInputDto,
  ): Promise<GetQuestionBySlugUseCaseOutputDto> {
    const question = await this.questionsRepository.findBySlug(input.slug)
    if (!question) throw new Error('No question found')
    return { question }
  }
}
