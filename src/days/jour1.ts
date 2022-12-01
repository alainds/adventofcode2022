import { input, inputEx } from "../data/input1";
import { reducerSum, reducerMax } from "@/util/array";

const data = input
  .split("\n\n")
  .map((m: any) => m.split("\n").map((i: string) => parseInt(i)));
const scores = data
  .map((m: any) => m.reduce(reducerSum))
  .sort((a: number, b: number) => a < b);

function result1() {
  return scores.reduce(reducerMax);
}
function result2() {
  return scores[0] + scores[1] + scores[2];
}

export default function getResultats() {
  return [result1(), result2()];
}
