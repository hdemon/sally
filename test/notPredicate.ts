import { notPredicate } from '../src/NotPredicate'

test('Success cases', () => {
  expect(notPredicate('123')().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(notPredicate('12')().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
})

test('Failure cases', () => {
  expect(notPredicate('ABC')().parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
  expect(notPredicate('123')().parse('12')).toEqual({
    consumed: 0,
    success: true,
  })
})
