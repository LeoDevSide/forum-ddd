import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/value-objects/unique-entity-id.value-object'

interface AnswerProps {
  content: string
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}
