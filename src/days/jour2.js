import { input, inputEx } from "../data/input2";
import { reducerMultiply, reducerSum } from "../util/array";

const data = input.split("\n").map(m => m.split(" "));
//TODO faire avec des permutations plutot...
function result1() {
  const scores = data.map(game => transformInScore(game[0], game[1]));
  return scores.map(a => a.reduce(reducerSum)).reduce(reducerSum);
}
function result2() {
  const scores = data.map(game => transformInScoreBis(game[0], game[1]));
  // console.log({ scores });
  return scores.map(a => a.reduce(reducerSum)).reduce(reducerSum);
}
export default function getResultats() {
  return [result1(), result2()]; 
}

const transformInScore = (a, b) => {
  let newA = a === "A" ? 1 : a === "B" ? 2 : 3;
  let intermediaireB = b === "X" ? 1 : b === "Y" ? 2 : 3;
  let scoreWin = 0;
  if (newA === intermediaireB) {
    scoreWin = 3;
  }
  if ((newA === 3 && intermediaireB === 1) || (newA === 2 && intermediaireB === 3) || (newA === 1 && intermediaireB === 2)) {
    scoreWin = 6;
  }

  return [intermediaireB, scoreWin];
}
const transformInScoreBis = (a, b) => {
  let newA = a === "A" ? 1 : a === "B" ? 2 : 3;
  let scoreWin = b === "X" ? 0 : b === "Y" ? 3 : 6;

  let newB = newA;
  if (b === "X") {
    newB = a === "A" ? 3 : a === "B" ? 1 : 2;
  }
  if (b === "Y") {
    newB = newA;
  }
  if (b === "Z") {
    newB = a === "A" ? 2 : a === "B" ? 3 : 1;
  }
  return [newB, scoreWin];
}