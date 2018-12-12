import { terminal } from '../src/terminal'

test('Success cases', () => {
  expect(terminal('123')().parse('123')).toEqual({
    consumed: 3,
    success: true,
  })
  expect(terminal('12')().parse('123')).toEqual({
    consumed: 2,
    success: true,
  })
})

test('Failure cases', () => {
  expect(terminal('ABC')().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(terminal('123')().parse('12')).toEqual({
    consumed: 0,
    success: false,
  })
})
