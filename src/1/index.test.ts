import fs from 'fs';
import { part1, part2 } from './index';

test('part1', () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map(Number);

  const res = part1(input);

  console.log(res);
});

test('part2', () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map(Number);

  const res = part2(input);

  console.log(res);
});
