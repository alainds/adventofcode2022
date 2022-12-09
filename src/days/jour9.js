import { input } from "../data/input9";
import { arraysEqual, getUnique } from "../util/array";

const data = input.split("\n").map((a) => a.split(" "));

function result1() {
  return getTMovesLength(data, 2);
}
function result2() {
  return getTMovesLength(data, 10);
}
export default function getResultats() {
  return [result1(), result2()];
}

function getTMovesLength(dataInput, taille) {
  let snake = Array.from(Array(taille), () => [0, 0]);
  let tMoves = [];
  for (let index = 0; index < dataInput.length; index++) {
    const moves = dataInput[index];
    const coor = moveSnake(moves, snake, tMoves);
    snake = coor.snake;
    tMoves = coor.movesT;
  }
  return getUnique(tMoves).length;
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
function moveSnake(moves, snakeInit, movesTInit) {
  const movesT = [...movesTInit];
  const direction = moves[0];
  const steps = parseInt(moves[1], 10);
  const snake = [...snakeInit];
  for (let index = 0; index < steps; index++) {
    //on bouge la tete
    const h = snake[0];
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
    //on voit le reste
    for (let i = 1; i < snake.length; i++) {
      if (arraysEqual(snake[i], snake[i - 1])) break;
      snake[i] = moveT(snake[i - 1], snake[i]);
    }
    const t = snake[snake.length - 1];
    movesT.push(t);
  }
  return { snake, movesT };
}
