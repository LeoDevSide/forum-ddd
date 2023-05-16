import { Slug } from './value-objects/slug.value-object'
import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/value-objects/unique-entity-id.value-object'

interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {}
