import Terminal from '../src/terminal'

test('Success cases', () => {
  expect(new Terminal('123').parse('123')).toEqual({
    consumed: 3,
    success: true,
  })
  expect(new Terminal('12').parse('123')).toEqual({
    consumed: 2,
    success: true,
  })
})

test('Failure cases', () => {
  expect(new Terminal('ABC').parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(new Terminal('123').parse('12')).toEqual({
    consumed: 0,
    success: false,
  })
})
