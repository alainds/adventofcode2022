import { input1,input2,input3, input1Ex,input2Ex,input3Ex } from "../data/input5";
import { reducerSum, transposeArraysOfArrays } from "../util/array";

const instructions = input3Ex.split("\n").map(a=> {
  const re = new RegExp('move ([0-9]*) from ([0-9]*) to ([0-9]*)');
  const nombres = re.exec(a)
  nombres.shift();
  return nombres.map(a=>parseInt(a))
});

console.log({instructions})
const cargos = input1Ex.split("\n").map(a=>{
  const re = new RegExp('\\[(.*)\\]');
  const line = re.exec(a);
  line.shift();
  return line;
})
console.log({cargos})
function result1() {
  // console.log({data});
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
