interface ICommand {
  direction: Direction;
  amount: number;
}

enum Direction {
  forward = 'forward',
  down = 'down',
  up = 'up',
}

export const part1 = (input: string[]): number => {
  let horizontalPos = 0;
  let verticalPos = 0;

  for (const line of input) {
    const command = parseLine(line);

    console.log(command);

    switch (command.direction) {
      case Direction.down:
        verticalPos += command.amount;
        break;
      case Direction.forward:
        horizontalPos += command.amount;
        break;
      case Direction.up:
        verticalPos -= command.amount;
        break;

      default:
        break;
    }
  }

  return horizontalPos * verticalPos;
};

export const part2 = (input: string[]): number => {
  let horizontalPos = 0;
  let verticalPos = 0;
  let aim = 0;

  for (const line of input) {
    const command = parseLine(line);

    console.log(command);

    switch (command.direction) {
      case Direction.down:
        aim += command.amount;
        break;
      case Direction.forward:
        horizontalPos += command.amount;
        verticalPos += (command.amount * aim);
        break;
      case Direction.up:
        aim -= command.amount;
        break;

      default:
        break;
    }
  }

  return horizontalPos * verticalPos;
};

const parseLine = (line: string): ICommand => {
  const split = line.split(' ');
  const res = { direction: Direction[split[0]], amount: Number.parseInt(split[1]) };

  return res;
};