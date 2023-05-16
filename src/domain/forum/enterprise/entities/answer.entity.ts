import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { Optional } from '../../../../core/types/optional'

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

  get questionId() {
    return this.props.questionId
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...') // preview of first 120 characters
  }

  private setInitialContent(content: string) {
    this.props.content = content
    this.touch()
  }

  private updateContent(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer({ ...props, createdAt: new Date() }, id)
    return answer
  }
}
