import { Slug } from './value-objects/slug.value-object'
import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/value-objects/unique-entity-id.value-object'
import { Optional } from '../../../../core/types/optional'
import dayjs from 'dayjs'

interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug.value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3 // if today - createdAt diff is 3d-, isNew
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

  private setInitialTitle(title: string) {
    this.props.title = title
    this.touch()
  }

  private updateTitle(title: string) {
    this.props.title = title
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  private defineBestAnswer(answerId: string) {
    this.props.bestAnswerId = new UniqueEntityID(answerId)
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )
    return question
  }
}
