import Terminal from '../src/terminal'

test('parse returns true if inputs is equal to the character which was given to constructor.', () => {
  expect(new Terminal('1').parse('1')).toEqual({ success: true, consumed: 1 })
  expect(new Terminal('123').parse('123')).toEqual({
    consumed: 3,
    success: true,
  })
})

test("parse return false if inputs isn't equal to the character which was given to constructor.", () => {
  expect(new Terminal('A').parse('1')).toEqual({ success: false, consumed: 0 })
  expect(new Terminal('123').parse('1')).toEqual({
    consumed: 0,
    success: false,
  })
})

// expect(new Terminal('123').parse('12')).toEqual(false)
// expect(new Terminal('123').parse('12345')).toEqual(false)
// expect(sequence(new Terminal('123'), new Terminal('45'))).parse('12345')).toEqual(false)
