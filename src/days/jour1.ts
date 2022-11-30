import { input } from "../data/input1";
const data = input.split("\n").map((i) => parseInt(i));

function result1() {
  return data[0];
}
function result2() {
  return 0;
}

export default function getResultats() {
  return [result1(), result2()];
}
