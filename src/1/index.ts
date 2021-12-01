export const part1 = (input: number[]): number =>
  input.reduce((prev, curr, currIndex) => (input[currIndex - 1] < curr ? prev + 1 : prev), 0);

export const part2 = (input: number[]): number => {
  return input.reduce((prev, curr, currIndex) => {
    if (currIndex < 3) {
      return 0;
    }

    const prevWindow = [input[currIndex - 1], input[currIndex - 2], input[currIndex - 3]].reduce(
      sumReducer,
    );
    const currWindow = [curr, input[currIndex - 1], input[currIndex - 2]].reduce(sumReducer);

    if (prevWindow < currWindow) {
      return prev + 1;
    }

    return prev;
  });
};

const sumReducer = (prev, curr) => prev + curr;
