import { input, inputEx } from "../data/input11";
import { reducerSum, transposeArraysOfArrays } from "../util/array";

function result1() {
  const tours = 20;
  let monkeys = input.split("\n\n").map((a) =>
    a
      .split("\n")
      .map((b, i) => {
        let reg;
        let retour = "suppr";
        switch (i) {
          case 1:
            retour = /^Starting items: (.*)$/
              .exec(b)[1]
              .split(", ")
              .map((c) => parseInt(c));
            break;
          case 2:
            retour = /Operation: new = (.*)$/.exec(b)[1];
            break;
          case 3:
          case 4:
          case 5:
            retour = parseInt(/.* ([0-9]+)/.exec(b)[1]);
            break;
          default:
            break;
        }
        return retour;
      })
      .filter((a) => a !== "suppr")
  );
  let count = Array.from(Array(monkeys.length), () => 0);
  for (let index = 0; index < tours; index++) {
    const { newMonkeys, countTurn } = doTurn(monkeys);
    count = count.map((n, i) => n + countTurn[i]);
    monkeys = newMonkeys;
  }
  // console.log(count);
  count = count.sort((a, b) => a > b).reverse();
  // console.log(monkeys, "monkeys /3");

  return count[0] * count[1];
}
function result2() {
  const tours = 10000;
  let monkeys = input.split("\n\n").map((a) =>
    a
      .split("\n")
      .map((b, i) => {
        let reg;
        let retour = "suppr";
        switch (i) {
          case 1:
            retour = /^Starting items: (.*)$/
              .exec(b)[1]
              .split(", ")
              .map((c) => parseInt(c));
            break;
          case 2:
            retour = /Operation: new = (.*)$/.exec(b)[1];
            break;
          case 3:
          case 4:
          case 5:
            retour = parseInt(/.* ([0-9]+)/.exec(b)[1]);
            break;
          default:
            break;
        }
        return retour;
      })
      .filter((a) => a !== "suppr")
  );
  let count = Array.from(Array(monkeys.length), () => 0);
  for (let index = 0; index < tours; index++) {
    const { newMonkeys, countTurn } = doTurnBis(monkeys);
    count = count.map((n, i) => n + countTurn[i]);
    monkeys = newMonkeys;
  }
  console.log(count);
  count = count.sort((a, b) => a > b).reverse();
  // console.log(monkeys, "monkeys");

  return count[0] * count[1];
}
function doTurn(monkeysInit) {
  const newMonkeys = [...monkeysInit];
  const countTurn = Array.from(Array(newMonkeys.length), () => 0);
  for (let index = 0; index < newMonkeys.length; index++) {
    const monkey = newMonkeys[index];
    const items = monkey[0];
    let newItems = items.map((old) =>
      parseInt(Math.floor(eval(monkey[1])) / 3)
    );
    const monkeyToThrows = newItems.map((item) =>
      item % monkey[2] === 0 ? monkey[3] : monkey[4]
    );
    // newItems = newItems.map((item) =>
    //   item % monkey[2] === 0 ? item / monkey[2] : item
    // );
    newMonkeys[index][0] = [];

    for (let j = 0; j < newItems.length; j++) {
      countTurn[index]++;
      newMonkeys[monkeyToThrows[j]][0].push(newItems[j]);
    }
  }
  return { newMonkeys, countTurn };
}
function doTurnBis(monkeysInit) {
  const newMonkeys = [...monkeysInit];
  const countTurn = Array.from(Array(newMonkeys.length), () => 0);
  newMonkeys;
  let modulo = 1;
  for (let index = 0; index < newMonkeys.length; index++) {
    modulo *= newMonkeys[index][2];
  }
  for (let index = 0; index < newMonkeys.length; index++) {
    const monkey = newMonkeys[index];
    const items = monkey[0];
    let newItems = items.map((old) => parseInt(eval(monkey[1]) % modulo));
    const monkeyToThrows = newItems.map((item) =>
      item % monkey[2] === 0 ? monkey[3] : monkey[4]
    );
    // newItems = newItems.map((item) =>
    //   item % monkey[2] === 0 ? item / monkey[2] : item
    // );
    newMonkeys[index][0] = [];

    for (let j = 0; j < newItems.length; j++) {
      countTurn[index]++;
      newMonkeys[monkeyToThrows[j]][0].push(newItems[j]);
    }
  }
  return { newMonkeys, countTurn };
}
export default function getResultats() {
  return [result1(), result2()];
}
