import { notPredicate } from '../src/not_predicate'
import { terminal } from '../src/terminal'

test('Success cases', () => {
  expect(notPredicate(terminal('abc'))().parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
  expect(notPredicate(terminal('123'))().parse('12')).toEqual({
    consumed: 0,
    success: true,
  })
})

test('Failure cases', () => {
  expect(notPredicate(terminal('123'))().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(notPredicate(terminal('12'))().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
})