import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { Optional } from '../../../../core/types/optional'

export interface AnswerCommentProps {
  content: string
  answerId: UniqueEntityID
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  get content() {
    return this.props.content
  }

  get answerId() {
    return this.props.answerId.value
  }

  get authorId() {
    return this.props.authorId.value
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

  public updateContent(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return answerComment
  }
}
