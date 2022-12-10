import { input, inputEx } from "../data/input10";
import { reducerSum, flatDeep } from "../util/array";

const data = flatDeep(
  input.split("\n").map((a) => {
    const b = a.split(" ");
    return b[0] === "noop" ? 0 : [0, parseInt(b[1])];
  })
);

function result1() {
  const stops = 20;
  const periodicity = 40;
  const signals = [];
  let X = 1;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const force = index + 1;
    if (force % periodicity === stops) {
      signals.push(X * force);
    }
    X += element;
  }
  return signals.reduce(reducerSum);
}
function result2() {
  const periodicity = 40;
  const signals = Array.from(Array(6), () => []);
  let X = 1;
  let sprite = 0;
  for (let index = 0; index < data.length; index++) {
    const isPixelLite = [X - 1, X, X + 1].includes(index % periodicity);
    const line = Math.floor(index / periodicity);
    signals[line].push(isPixelLite ? "#" : ".");
    X += data[index];
  }
  const result = signals.map((a) => a.join("")).join("\n");

  return <pre>{result}</pre>;
}
export default function getResultats() {
  return [result1(), result2()];
}
