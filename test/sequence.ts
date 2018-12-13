import { endOfFile } from '../src/operator/end_of_file'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

let parser: any

beforeEach(() => {
  parser = sequence([terminal('abc'), terminal('def')])
})

test('Success and all characters will be consumed.', () => {
  expect(parser.parse('abcdef')).toEqual({ success: true, consumed: 6 })
})

test("Success but some characters won't be consumed.", () => {
  expect(parser.parse('abcdefghe')).toEqual({ success: true, consumed: 6 })
})

test('Failure but some characters will be consumed.', () => {
  expect(parser.parse('abcde')).toEqual({ success: false, consumed: 3 })
})

test('Failure and no characters will be consumed.', () => {
  expect(parser.parse('def')).toEqual({ success: false, consumed: 0 })
  expect(parser.parse('123')).toEqual({ success: false, consumed: 0 })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    parser = sequence([
      sequence([terminal('abc'), terminal('def')]),
      endOfFile(),
    ])
    expect(parser.parse('abcdefghe')).toEqual({ success: false, consumed: 6 })
  })
})
