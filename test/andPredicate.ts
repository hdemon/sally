import { andPredicate } from '../src/andPredicate'

test('Success cases', () => {
  expect(andPredicate('123')().parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
  expect(andPredicate('12')().parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
})

test('Failure cases', () => {
  expect(andPredicate('ABC')().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(andPredicate('123')().parse('12')).toEqual({
    consumed: 0,
    success: false,
  })
})
