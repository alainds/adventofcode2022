import { input, inputEx } from "../data/input4";
import { reducerSum, transposeArraysOfArrays } from "../util/array";

const data = input.split("\n").map((i) => i.split(",").map((a)=>a.split("-").map((b)=>parseInt(b,10))) );

function result1() {
  // console.log({data});
  let result = 0;
  
 let inclusions = data.map(items => {
    const includeLeft = items[0][0] >= items[1][0] && items[0][1] <= items[1][1] ;
    const includeRight = items[0][0] <= items[1][0] && items[0][1] >= items[1][1] ;
    return includeLeft || includeRight ? 1 : 0 ;
  })
  // console.log({inclusions});
  return inclusions.reduce(reducerSum);
}
function result2() {
  let result = 0;
  
 let overlaps = data.map(items => {
  const min = Math.min(items[0][0],items[1][0])
  const overlapLeft =  min === items[0][0] && items[0][1] >= items[1][0] ;
  const overlapRight = min === items[1][0] && items[1][1] >= items[0][0] ;
  return overlapLeft || overlapRight ? 1 : 0 ;
  })
// console.log({inclusions});
  return overlaps.reduce(reducerSum);
}
export default function getResultats() {
  return [result1(), result2()];
}
