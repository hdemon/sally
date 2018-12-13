import { endOfFile } from '../src/end_of_file'
import { sequence } from '../src/sequence'
import { terminal } from '../src/terminal'

test('Success cases', () => {
  expect(terminal('123')().parse('123')).toEqual({
    consumed: 3,
    success: true,
  })
  expect(terminal('12')().parse('123')).toEqual({
    consumed: 2,
    success: true,
  })
})

test('Failure cases', () => {
  expect(terminal('ABC')().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(terminal('123')().parse('12')).toEqual({
    consumed: 0,
    success: false,
  })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    expect(sequence([terminal('12'), endOfFile()])().parse('123')).toEqual({
      consumed: 2,
      success: false,
    })
  })
})
