export const part1 = (input: string[]): number => {
  // eslint-disable-next-line prefer-const
  let { drawOrder, boards } = parseInput(input);

  for (const draw of drawOrder) {
    console.log('draw', draw);

    boards = markBoards(boards, draw);
    boards = markWinners(boards, draw);

    const winningBoard = boards.filter((board) => board.winningNumber !== null);

    if (winningBoard && winningBoard.length > 0) {
      return calculateBoardScore(winningBoard[0]);
    }
  }
};

export const part2 = (input: string[]): number => {
  // eslint-disable-next-line prefer-const
  let { drawOrder, boards } = parseInput(input);
  let winningBoards: Board[] = [];

  for (const draw of drawOrder) {
    console.log('draw', draw);

    boards = markBoards(boards, draw);
    boards = markWinners(boards, draw);

    // Filter out boards that have won
    winningBoards = [...winningBoards, ...boards.filter((x) => x.winningNumber !== null)];

    boards = boards.filter((x) => x.winningNumber === null);
  }

  const lastWinningBoard = winningBoards[winningBoards.length - 1];

  return calculateBoardScore(lastWinningBoard);
};

const calculateBoardScore = (board: Board) =>
  board.board
    .flat()
    .filter((x) => !x.includes('*'))
    .map(Number)
    .reduce((prev, curr) => prev + curr) * parseInt(board.winningNumber);

const parseInput = (input) => {
  const drawOrder = input[0].split(',');

  input = input.slice(2);

  const parsed = input
    .filter((x) => x !== '')
    .flatMap((x) => {
      return [x.split(' ').filter((x) => x !== '')];
    });

  const boards = spliceIntoChunks(parsed, 5);

  return { drawOrder, boards };
};

const filterWinner = (boards: Board[]): Board[] => {
  const checkRowReducer = (prev, curr) => (curr.includes('*') ? prev + 1 : prev);

  return boards.filter((board) => {
    // Check for winning row
    const winningRow = board.board.some((row) => {
      if (row.reduce(checkRowReducer, 0) === 5) {
        return true;
      }

      return false;
    });

    // rotate board 90 deg to reuse row-checking logic for columns
    const rotated = (board.board = board.board[0].map((val, index) =>
      board.board.map((row) => row[index]).reverse(),
    ));

    const winningColumn = rotated.some((row) => {
      if (row.reduce(checkRowReducer, 0) === 5) {
        return true;
      }

      return false;
    });

    if (winningRow || winningColumn) {
      return true;
    }

    return false;
  });
};

const markWinners = (boards: Board[], draw: string): Board[] => {
  const winningBoards = filterWinner(boards);

  if (winningBoards.length > 0) {
    return boards.map((board) => {
      if (winningBoards.some((x) => x.id === board.id)) {
        return <Board>{ board: board.board, winningNumber: draw, id: board.id };
      }

      return <Board>{ board: board.board, winningNumber: null, id: board.id };
    });
  }

  return boards;
};

const markBoards = (boards: Board[], draw: string): Board[] => {
  return boards.map((board) => {
    return <Board>{
      board: board.board.map((x) => {
        const index = x.findIndex((el) => el == draw);

        if (index !== -1) {
          x[index] = `${x[index]}*`;
        }

        return x;
      }),
      id: board.id,
      winningNumber: board.winningNumber,
    };
  });
};

const spliceIntoChunks = (arr, chunkSize): Board[] => {
  let id = 0;
  const res: Board[] = [];

  while (arr.length > 0) {
    const chunk: string[][] = arr.splice(0, chunkSize);

    res.push({
      id,
      board: chunk,
      winningNumber: null,
    });

    id += 1;
  }

  return res;
};

interface Board {
  id: number;
  board: string[][];
  winningNumber: string;
}
