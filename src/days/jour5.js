import { inputEx, input } from "../data/input5";

const data = input.split("\n\n");
const instructionsLabels = data[0].split("\n").pop();
const colonnesInput = data[0];
const instructionsInput = data[1];
const taille = parseInt(
  instructionsLabels.replaceAll("  ", " ").trim().split(" ").pop()
);

function result1() {
  return move(getInstructions(instructionsInput), getColonnes(colonnesInput))
    .map((a) => a[0])
    .join("");
}
function result2() {
  return move(
    getInstructions(instructionsInput),
    getColonnes(colonnesInput),
    false
  )
    .map((a) => a[0])
    .join("");
}
export default function getResultats() {
  return [result1(), result2()];
}

function getColonnes(input) {
  let colonnes = Array.from(Array(taille), () => []);
  input.split("\n").map((a, i) => {
    for (let index = 0; index < taille; index++) {
      const lettre = a.at(1 + index * 4);
      if (lettre !== " ") colonnes[index].push(lettre);
    }
  });
  return colonnes;
}
function getInstructions(input) {
  return input.split("\n").map((a) => {
    const re = new RegExp("move ([0-9]*) from ([0-9]*) to ([0-9]*)");
    const nombres = re.exec(a);
    nombres.shift();
    return nombres.map((a) => parseInt(a));
  });
}
function move(instructions, colonnesInput, isReverse = true) {
  const colonnes = [...colonnesInput];
  instructions.map((instruction, j) => {
    const toMove = colonnes[instruction[1] - 1].splice(0, instruction[0]);
    colonnes[instruction[2] - 1].unshift(
      ...(isReverse ? toMove.reverse() : toMove)
    );
  });
  return colonnes;
}
