import { andPredicate } from '../src/operator/and_predicate'
import { terminal } from '../src/operator/terminal'

test('Failure cases', () => {
  expect(andPredicate(terminal('abc')).parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(andPredicate(terminal('123')).parse('12')).toEqual({
    consumed: 0,
    success: false,
  })
})

test('Success cases', () => {
  expect(andPredicate(terminal('123')).parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
  expect(andPredicate(terminal('12')).parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
})
