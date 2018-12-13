import { choice } from '../src/operator/choice'
import { endOfFile } from '../src/operator/end_of_file'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

describe('Choice', () => {
  test('Success cases', () => {
    const parser = choice([terminal('a'), terminal('ab')])
    expect(parser().parse('ab')).toEqual({ success: true, consumed: 1 })
  })

  test('Failure cases', () => {
    const parser = choice([terminal('abc'), terminal('def')])
    expect(parser().parse('ghi')).toEqual({ success: false, consumed: 0 })
  })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    const parser = sequence([
      choice([terminal('a'), terminal('ab')]),
      endOfFile(),
    ])
    expect(parser().parse('ab')).toEqual({ success: false, consumed: 1 })
  })
})
