import { notPredicate } from '../src/operator/not_predicate'
import { terminal } from '../src/operator/terminal'

test('Success', () => {
  expect(notPredicate(terminal('abc')).parse('123')).toMatchObject({
    consumed: 0,
    success: true,
  })
  expect(notPredicate(terminal('123')).parse('12')).toMatchObject({
    consumed: 0,
    success: true,
  })
})

test('Failure', () => {
  expect(notPredicate(terminal('123')).parse('123')).toMatchObject({
    consumed: 0,
    success: false,
  })
  expect(notPredicate(terminal('12')).parse('123')).toMatchObject({
    consumed: 0,
    success: false,
  })
})
