import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'

export interface CommentProps {
  content: string
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get content() {
    return this.props.content
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
}
