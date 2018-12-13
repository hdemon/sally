import { endOfFile } from '../src/operator/end_of_file'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

let parser: any

beforeEach(() => {
  parser = sequence([terminal('abc'), terminal('def')])
})

test('Success cases', () => {
  expect(parser().parse('abcdef')).toEqual({ success: true, consumed: 6 })
  expect(parser().parse('abcdefghe')).toEqual({ success: true, consumed: 6 })
})

test('Failure cases', () => {
  expect(parser().parse('abcde')).toEqual({ success: false, consumed: 3 })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    parser = sequence([
      sequence([terminal('abc'), terminal('def')]),
      endOfFile(),
    ])
    expect(parser().parse('abcdefghe')).toEqual({ success: false, consumed: 6 })
  })
})
