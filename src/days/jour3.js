import { input, inputEx } from "../data/input3"
import { reducerSum } from "../util/array"

const data = input.split("\n").map((a) => {const l=a.split("").length ;return [a.substring(0,l/2),a.substring(l/2)]});
const dataInter = input.split("\n");
const getdata3 = (array) => {
  let a = [];
  for (let index = 0; index <(array.length + 1 /3) - 1; index+=3) {
    a.push([array[index], array[index+1], array[index+2]]);
  }
  return a;
}

const position = (chaine) => {
  const positionInit = chaine.charCodeAt(0);
  return positionInit >= 97 ? positionInit - 96 : positionInit - 65 + 27;
}

function match([s1, s2]) {
  let a = "";
  for(let i in s1) {
      if (s2.includes(s1[i])) a+=s1[i] ;
  }
  return a ;
}

function result1() {
  // console.log(data);
  const communs = data.map(a=> match(a));
  // console.log({communs});
  const positions = communs.map(a=> position(a));
  // console.log({positions});
  return positions.reduce(reducerSum);
}

function result2() {
  const data3 = getdata3(dataInter);
  // console.log({data3})
  
  const communs = data3.map(a=>  match([
      match([a[0], a[1]]), 
      a[2]
    ])
  );
  
  // console.log({communs})
  
  const positions = communs.map(a=> position(a));
  // console.log({positions});
  return positions.reduce(reducerSum);
  // return 0;
}
export default function getResultats() {
  return [result1(), result2()]
}
