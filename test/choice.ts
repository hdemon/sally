import { choice } from '../src/choice'
import { terminal } from '../src/terminal'

describe('Choice', () => {
  test('Success cases', () => {
    const parser = choice([terminal('abc'), terminal('def')])
    expect(parser().parse('ghi')).toEqual({ success: false, consumed: 0 })
  })

  test('Failure cases', () => {
    const parser = choice([terminal('a'), terminal('ab')])
    expect(parser().parse('ab')).toEqual({ success: false, consumed: 0 })
  })
})
