import { optional } from '../src/operator/optional'
import { terminal } from '../src/operator/terminal'

let parser: any
beforeEach(() => {
  parser = optional(terminal('abc'))
})

test('Success and all characters will be consumed.', () => {
  expect(parser.parse('')).toEqual({ success: true, consumed: 0 })
  expect(parser.parse('abc')).toEqual({ success: true, consumed: 3 })
})

test('Failure.', () => {
  expect(parser.parse('def')).toEqual({ success: false, consumed: 0 })
})
