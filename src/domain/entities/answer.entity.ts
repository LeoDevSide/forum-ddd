import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/value-objects/unique-entity-id.value-object'
import { Optional } from '../../core/types/optional'

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

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer({ ...props, createdAt: new Date() }, id)
    return answer
  }
}
