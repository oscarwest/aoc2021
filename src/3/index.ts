export const part1 = (input: string[]): number => {
  const ds = input.flatMap((x) => [x.split('').map(Number)]);

  const bitCount = getBitCountPerBinaryPosition(ds);

  const binaryGamma = bitCount.map((x) => (x > input.length / 2 ? 1 : 0));
  const binaryEpsilon = binaryGamma.map((x) => (x ? 0 : 1));

  const decimalGamma = parseInt(binaryGamma.join(''), 2);
  const decimalEpsilon = parseInt(binaryEpsilon.join(''), 2);

  return decimalGamma * decimalEpsilon;
};

export const part2 = (input: string[]): number => {
  const ds = input.flatMap((x) => [x.split('').map(Number)]);

  const binaryOxygenGeneratorRating = getRating(ds, oxygenComparator).join('');
  const binaryCO2Rating = getRating(ds, co2Comparator).join('');

  const decimalOxygenGeneratorRating = parseInt(binaryOxygenGeneratorRating, 2);
  const decimalCO2Rating = parseInt(binaryCO2Rating, 2);

  return decimalOxygenGeneratorRating * decimalCO2Rating;
};

const oxygenComparator = (a, b) => (a >= b ? 1 : 0);
const co2Comparator = (a, b) => (a >= b ? 0 : 1);

const getBitCountPerBinaryPosition = (arr): number[] => {
  return arr.reduce((prev, curr) => {
    return prev.map((val, idx) => {
      return val + curr[idx];
    });
  });
};

const getRating = (
  arr: number[][],
  comparator: (a: number, b: number) => 1 | 0,
  pos = 0,
): number[] => {
  if (arr.length === 1) {
    return arr[0];
  }

  const bitCount = getBitCountPerBinaryPosition(arr);

  const filtered = arr.filter((val) => {
    const majorityValue = comparator(bitCount[pos], arr.length / 2);

    if (val[pos] === majorityValue) {
      return val;
    }
  });

  return getRating(filtered, comparator, pos + 1);
};
