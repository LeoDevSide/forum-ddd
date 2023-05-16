import { randomUUID } from 'node:crypto'
import { Slug } from './value-objects/slug.value-object'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question {
  public title: string
  public content: string
  public id: string
  public authorId: string
  public slug: Slug

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.content = props.content
    this.authorId = props.authorId
    this.slug = props.slug
    this.id = id ?? randomUUID()
  }
}
