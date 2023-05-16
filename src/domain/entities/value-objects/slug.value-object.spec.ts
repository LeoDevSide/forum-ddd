import { expect, test } from 'vitest'
import { Slug } from './slug.value-object'

test('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example test to transform')
  expect(slug.value).toEqual('example-test-to-transform')
})
