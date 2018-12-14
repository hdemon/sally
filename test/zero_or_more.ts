import { endOfFile } from '../src/operator/end_of_file'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'
import { zeroOrMore } from '../src/operator/zero_or_more'

let parser: any

beforeEach(() => {
  parser = () => zeroOrMore(terminal('abc'))
})

test('Success and all characters will be consumed.', () => {
  expect(parser().parse('')).toEqual({ success: true, consumed: 0 })
  expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser().parse('abcabc')).toEqual({ success: true, consumed: 6 })
})

test("Success but some characters won't be consumed.", () => {
  expect(parser().parse('abcdef')).toEqual({ success: true, consumed: 3 })
})

test('Success but no characters will be consumed.', () => {
  expect(parser().parse('def')).toEqual({ success: true, consumed: 0 })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    parser = () => sequence([zeroOrMore(terminal('abc')), endOfFile()])
    expect(parser().parse('abcdef')).toEqual({ success: false, consumed: 3 })
    expect(parser().parse('def')).toEqual({ success: false, consumed: 0 })
  })
})
