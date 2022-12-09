import { input } from "../data/input9";
import { arraysEqual, getUnique } from "../util/array";

const data = input.split("\n").map((a) => a.split(" "));

function result1() {
  return getTailMovesLength(data, 2);
}
function result2() {
  return getTailMovesLength(data, 10);
}
export default function getResultats() {
  return [result1(), result2()];
}

function getTailMovesLength(dataInput, taille) {
  let snake = Array.from(Array(taille), () => [0, 0]);
  const tailMoves = [];
  for (let index = 0; index < dataInput.length; index++) {
    const currentMove = dataInput[index];
    const afterMove = moveSnake({ currentMove, snakeToMove: snake });
    snake = afterMove.snake;
    tailMoves.push(...afterMove.tailMoves);
  }
  return getUnique(tailMoves).length;
}

function moveSnake({ currentMove, snakeToMove }) {
  const snake = [...snakeToMove];
  const tailMoves = [];
  const direction = currentMove[0];
  const steps = parseInt(currentMove[1], 10);
  for (let index = 0; index < steps; index++) {
    //on bouge la tete
    const h = moveHead(snake[0]);

    //on bouge le reste en fonction
    for (let i = 1; i < snake.length; i++) {
      if (arraysEqual(snake[i], snake[i - 1])) break;
      snake[i] = moveT(snake[i - 1], snake[i]);
    }
    const t = snake[snake.length - 1];
    tailMoves.push(t);
  }
  return { snake, tailMoves };
}

function moveHead(head) {
  const h = [...head];
  switch (direction) {
    case "R":
      h[0]++;
      break;
    case "L":
      h[0]--;
      break;
    case "U":
      h[1]++;
      break;
    case "D":
      h[1]--;
      break;
    default:
      break;
  }
  return h;
}

function moveT(h, tInit) {
  let t = [...tInit];
  const diffX = h[0] - t[0];
  const diffY = h[1] - t[1];
  const diffXAbs = Math.abs(diffX);
  const diffYAbs = Math.abs(diffY);
  if (diffXAbs > 1) {
    t[0] = t[0] + diffX / diffXAbs;
    if (diffYAbs === 1) t[1] = t[1] + diffY / diffYAbs;
  }
  if (diffYAbs > 1) {
    if (diffXAbs === 1) t[0] = t[0] + diffX / diffXAbs;
    t[1] = t[1] + diffY / diffYAbs;
  }
  return t;
}
