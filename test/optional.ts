import { optional } from '../src/alias/optional'
import { terminal } from '../src/operator/terminal'

let parser: any
beforeEach(() => {
  parser = optional(terminal('abc'))
})

test('Success and all characters will be consumed.', () => {
  expect(parser.parse('')).toMatchObject({ success: true, consumed: 0 })
  expect(parser.parse('abc')).toMatchObject({ success: true, consumed: 3 })
})

test("Success and some characters won't be consumed.", () => {
  expect(parser.parse('def')).toMatchObject({ success: true, consumed: 0 })
})
