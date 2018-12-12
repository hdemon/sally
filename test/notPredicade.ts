import NotPredicade from '../src/NotPredicade'

test('Success cases', () => {
  expect(new NotPredicade('123').parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(new NotPredicade('12').parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
})

test('Failure cases', () => {
  expect(new NotPredicade('ABC').parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
  expect(new NotPredicade('123').parse('12')).toEqual({
    consumed: 0,
    success: true,
  })
})
