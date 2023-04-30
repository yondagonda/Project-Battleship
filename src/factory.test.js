import { createShip, Gameboard } from './factory';

// tests for the Ship factory function

test('ship takes a hit', () => {
  const testShip = createShip(3);
  testShip.hit();
  testShip.hit();
  expect(testShip.hitsTaken).toBe(2);
});

test('ship becomes sunk', () => {
  const testShip = createShip(1);
  testShip.hit();
  testShip.checkIfSunk();
  expect(testShip.sunk).toBe(true);
});

// tests for the Gameboard factory function
const testGameboard = Gameboard();
const carrier = createShip(5);

test('gameboard places ship over specified coordinates', () => {
  expect(testGameboard.placeShip(carrier, [1, 5])).toStrictEqual([
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2],
    [1, 1],
  ]);
});

test('gameboard should be able to determine if an attack was a hit', () => {
  expect(testGameboard.receiveAttack([1, 4])).toBe('the hit was successful');
});

test('gameboard should be able to determine if an attack was a miss', () => {
  expect(testGameboard.receiveAttack([1, 6])).toBe(
    'the attack did not hit anything'
  );
});
