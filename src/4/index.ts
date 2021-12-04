export const part1 = (input: string[]): number => {
  const drawOrder = input[0].split(',');

  input = input.slice(2);

  const parsed = input
    .filter((x) => x !== '')
    .flatMap((x) => {
      return [x.split(' ').filter((x) => x !== '')];
    });

  let boards = spliceIntoChunks(parsed, 5);

  for (const draw of drawOrder) {
    console.log('draw', draw);

    boards = markBoards(boards, draw);

    // Check for winner
    const winner = checkWinner(boards);

    if (winner?.length > 0) {
      console.log(winner);

      return (
        winner
          .flat()
          .filter((x) => !x.includes('*'))
          .map(Number)
          .reduce((prev, curr) => prev + curr) * parseInt(draw)
      );
    }
  }
};

const filterWinner = (boards: string[][][], rotate: boolean = false) => {
  return boards.filter((board) => {
    // rotate board 90 deg to reuse row-checking logic for columns
    if (rotate) board = board[0].map((val, index) => board.map((row) => row[index]).reverse());

    return board.some((row) => {
      if (row.reduce((prev, curr) => (curr.includes('*') ? prev + 1 : prev), 0) === 5) {
        return true;
      }

      return false;
    });
  });
};

const checkWinner = (boards: string[][][]) => {
  const winningRowBoard = filterWinner(boards);
  if (winningRowBoard.length === 1) {
    return winningRowBoard[0];
  }

  const winningColumnBoard = filterWinner(boards, true);
  if (winningColumnBoard.length === 1) {
    return winningColumnBoard[0];
  }

  return [];
};

const markBoards = (boards: string[][][], draw: string): string[][][] => {
  return boards.map((board) => {
    return board.map((x) => {
      const index = x.findIndex((el) => el == draw);

      if (index !== -1) {
        x[index] = `${x[index]}*`;
      }

      return x;
    });
  });
};

const spliceIntoChunks = (arr, chunkSize): string[][][] => {
  const res = [];

  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);

    res.push(chunk);
  }

  return res;
};
