import { input, inputEx } from "../data/input6";
import { reducerSum, transposeArraysOfArrays } from "../util/array";

const data = input.split("");

function result1() {  
  return findFirstOfMarker(data, 4);
}
function result2() {  
  return findFirstOfMarker(data, 14);
}
export default function getResultats() {
  return [result1(), result2()];
}

function findFirstOfMarker(data, size) {
  let indexAtrouver = 0
  for (let index = 0; index < data.length; index++) {
    let firsts = new Set(data.slice(index,index+size));
    if (firsts.size === size) {
      indexAtrouver = index + size;
      break;
    }
  }
  return indexAtrouver;
}