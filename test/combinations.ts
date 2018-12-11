import Choice from '../src/choice'
import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const parser = new Choice([
    () => new Sequence([() => new Terminal('a'), () => new Terminal('b')]),
    () => new Sequence([() => new Terminal('A'), () => new Terminal('B')]),
  ])

  expect(parser.parse('ab')).toEqual({ success: true, consumed: 2 })
  expect(parser.parse('AB')).toEqual({ success: true, consumed: 2 })
  expect(parser.parse('aB')).toEqual({ success: false, consumed: 0 })
})
