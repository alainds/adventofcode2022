import { input, inputEx } from "../data/input8";
import { reducerMax, reducerSum, transposeArraysOfArrays } from "../util/array";

const matrice = input
  .split("\n")
  .map((a) => a.split("").map((b) => parseInt(b, 10)));

function result1() {
  const matriceVisibles = getMatriceResultat(matrice, getVisible);
  let result = matriceVisibles
    .map((a) => a.reduce(reducerSum))
    .reduce(reducerSum);

  return result;
}
function result2() {
  const matriceScenic = getMatriceResultat(matrice, getScenic);
  let result = matriceScenic
    .map((a) => a.reduce(reducerMax))
    .reduce(reducerMax);
  return result;
}
export default function getResultats() {
  return [result1(), result2()];
}

const getMatriceResultat = (matrice, fonction = getVisible) => {
  const matriceVisibles = [...matrice].map((a) => a.map((b) => 1));
  const matriceT = transposeArraysOfArrays(matrice);
  for (let i = 1; i < matrice.length - 1; i++) {
    const ligne = matrice[i];
    for (let j = 1; j < ligne.length - 1; j++) {
      matriceVisibles[i][j] = fonction({
        ligne,
        colonne: matriceT[j],
        i: j,
        j: i,
      });
    }
  }
  return matriceVisibles;
};

const getVisible = ({ ligne, colonne, i, j }) => {
  const element = ligne[i];
  if (element === 0) return 0;

  const fonctionColonneDebut = () =>
    getVisibleDirectionDebut({ direction: colonne, index: j });
  const fonctionColonneFin = () =>
    getVisibleDirectionFin({ direction: colonne, index: j });
  const fonctionLigneDebut = () =>
    getVisibleDirectionDebut({ direction: ligne, index: i });
  const fonctionLigneFin = () =>
    getVisibleDirectionFin({ direction: ligne, index: i });

  let fonction1;
  let fonction2;
  let fonction3;
  let fonction4;

  switch (i) {
    case i < ligne.length / 2:
      fonction1 = fonctionLigneDebut;
      fonction4 = fonctionLigneFin;
      break;
    default:
      fonction1 = fonctionLigneFin;
      fonction4 = fonctionLigneDebut;
      break;
  }
  switch (j) {
    case j < colonne.length / 2:
      fonction2 = fonctionColonneDebut;
      fonction3 = fonctionColonneFin;
      break;
    default:
      fonction2 = fonctionColonneFin;
      fonction3 = fonctionColonneDebut;
      break;
  }

  const fonctions = [fonction1, fonction2, fonction3, fonction4];
  for (let index = 0; index < fonctions.length; index++) {
    if (fonctions[index]()) return 1;
  }
  return 0;
};

const getVisibleDirectionDebut = ({ direction, index }) => {
  const element = direction[index];
  let visible = true;
  let indexTop = 0;
  while (visible && indexTop !== index) {
    visible = element > direction[indexTop];
    indexTop++;
  }
  return visible;
};

const getVisibleDirectionFin = ({ direction, index }) => {
  const element = direction[index];
  let visible = true;
  let indexTop = direction.length - 1;
  while (visible && indexTop !== index) {
    visible = element > direction[indexTop];
    indexTop--;
  }
  return visible;
};

const getScenic = ({ ligne, colonne, i, j }) => {
  const nbDansColonneAvant = getScenicDirectionApres({
    direction: colonne,
    index: j,
  });
  const nbDansColonneApres = getScenicDirectionAvant({
    direction: colonne,
    index: j,
  });
  const nbDansLigneAvant = getScenicDirectionApres({
    direction: ligne,
    index: i,
  });
  const nbDansLigneApres = getScenicDirectionAvant({
    direction: ligne,
    index: i,
  });
  return (
    nbDansColonneAvant *
    nbDansColonneApres *
    nbDansLigneAvant *
    nbDansLigneApres
  );
};

const getScenicDirectionApres = ({ direction, index }) => {
  const element = direction[index];
  let visible = true;
  let indexTop = index + 1;
  let count = 0;
  while (visible && indexTop !== direction.length) {
    visible = element > direction[indexTop];
    indexTop++;
    count++;
  }
  return count;
};

const getScenicDirectionAvant = ({ direction, index }) => {
  const element = direction[index];
  let visible = true;
  let indexTop = index - 1;
  let count = 0;
  while (visible && indexTop !== -1) {
    visible = element > direction[indexTop];
    indexTop--;
    count++;
  }
  return count;
};
