import { choice } from '../src/operator/choice'

import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

describe('Choice', () => {
  test('Success cases', () => {
    const parser = choice([terminal('a'), terminal('ab')])
    expect(parser.parse('ab')).toMatchObject({ success: true, consumed: 1 })
  })

  test('Failure cases', () => {
    const parser = choice([terminal('abc'), terminal('def')])
    expect(parser.parse('ghi')).toMatchObject({ success: false, consumed: 0 })
  })
})
