import { input, inputEx } from "../data/input5";
import { reducerSum, transposeArraysOfArrays } from "../util/array";

const data = input.split("\n").map((i) => i.split(","));

function result1() {
  console.log({data});
  let result = 0;
  
  return result;
}
function result2() {
  let result = 0;
  
  return result;
}
export default function getResultats() {
  return [result1(), result2()];
}
