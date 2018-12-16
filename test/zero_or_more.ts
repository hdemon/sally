import { endOfFile } from '../src/alias/end_of_file'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'
import { zeroOrMore } from '../src/alias/zero_or_more'

let parser: any

beforeEach(() => {
  parser = () => zeroOrMore(terminal('abc'))
})

test('Success and all characters will be consumed.', () => {
  expect(parser().parse('')).toMatchObject({ success: true, consumed: 0 })
  expect(parser().parse('abc')).toMatchObject({ success: true, consumed: 3 })
  expect(parser().parse('abcabc')).toMatchObject({ success: true, consumed: 6 })
})

test("Success but some characters won't be consumed.", () => {
  expect(parser().parse('abcdef')).toMatchObject({ success: true, consumed: 3 })
})

test('Success but no characters will be consumed.', () => {
  expect(parser().parse('def')).toMatchObject({ success: true, consumed: 0 })
})
