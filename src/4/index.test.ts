import fs from 'fs';
import { part1 } from './index';

test('d4part1', () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

  const res = part1(input);

  expect(res).toBe(58374);
});

// test('d3part2', () => {
//   const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

//   const res = part2(input);

//   expect(res).toBe(3969126);
// });
