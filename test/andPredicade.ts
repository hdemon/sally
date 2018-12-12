import AndPredicade from '../src/andPredicade'

test('Success cases', () => {
  expect(new AndPredicade('123').parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
  expect(new AndPredicade('12').parse('123')).toEqual({
    consumed: 0,
    success: true,
  })
})

test('Failure cases', () => {
  expect(new AndPredicade('ABC').parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(new AndPredicade('123').parse('12')).toEqual({
    consumed: 0,
    success: false,
  })
})
