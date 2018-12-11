import Choice from '../src/choice'
import Terminal from '../src/terminal'

describe('Choice', () => {
  test('Success cases', () => {
    const parser = new Choice([
      () => new Terminal('abc'),
      () => new Terminal('def'),
    ])
    expect(parser.parse('ghi')).toEqual({ success: false, consumed: 0 })
  })

  test('Failure cases', () => {
    const parser = new Choice([
      () => new Terminal('a'),
      () => new Terminal('ab'),
    ])
    expect(parser.parse('ab')).toEqual({ success: false, consumed: 0 })
  })
})
