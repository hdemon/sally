import Choice from '../src/choice'
import Sequence from '../src/sequence'
import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  const parser = new Choice([
    () => new Sequence([() => new Terminal('a'), () => new Terminal('b')]),
    () => new Sequence([() => new Terminal('A'), () => new Terminal('B')]),
  ])

  expect(parser.parse('ab')).toEqual(true)
  expect(parser.parse('AB')).toEqual(true)
  expect(parser.parse('aB')).toEqual(false)
})
