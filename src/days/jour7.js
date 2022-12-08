import { input, inputEx } from "../data/input7";
import { reducerSum, transposeArraysOfArrays } from "../util/array";

function result1() {
  // const { dirs, files } = getDirTreeAndFiles(input);
  // console.log({ dirs });
  // console.log({ files });
  // const filessave = calculKeys({ dirs, files });
  // console.log({ filessave }, " filessave avant");
  // const dirsSizes = Object.keys(filessave).map((k) =>
  //   filessave[k].reduce(reducerSum)
  // );
  // console.log({ filessave }, " filessave apres");
  // console.log({ dirsSizes });
  // let result = dirsSizes.filter((a) => a < 100000.0).reduce(reducerSum);
  // return result;
  return 0;
}
function result2() {
  let result = 0;

  return result;
}
export default function getResultats() {
  return [result1(), result2()];
}

function calculKeys({ dirs, files }) {
  //TODO à refaire
  let filessave = { ...files };
  // console.log({ filessave });
  const getKeys = (obj) => {
    let keys = Object.keys(obj);
    console.log(keys, "keys");
    if (!keys || keys.length === 0) return 0;
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const subkeys = Object.keys(obj[key]);
      subkeys.map((k) => {
        if (filessave[k][0] === 0) console.log(k, "k");
        filessave[key].push(...filessave[k]);
      });
      return getKeys(obj[key]);
    }
  };
  dirs && getKeys(dirs);
  return filessave;
}

function getDirTreeAndFiles(input) {
  const files = {};
  const dirs = {};
  const currentDirs = [];
  const instructions = input.split("\n").map((a) => {
    const cd = new RegExp("\\$ cd (.*)");
    const ls = new RegExp("\\$ ls");
    const dir = new RegExp("dir (.*)");
    const file = new RegExp("^([0-9]*) (.*)");
    // console.log(a);
    if (a.match(cd)) {
      const currentDir = currentDirs[0];
      if (files[currentDir] === undefined) files[currentDir] = [0];
      if (cd.exec(a)[1] !== "..") currentDirs.unshift(cd.exec(a)[1]);
      if (cd.exec(a)[1] === "..") currentDirs.shift();
    }

    if (a.match(dir)) {
      const addDir = dir.exec(a)[1];
      const currentDir = currentDirs[0];
      // console.log({ currentDirs });
      let currentDirChange = dirs;
      [...currentDirs].reverse().map((d, i) => {
        // console.log({ currentDirChange });
        if (i + 1 === currentDirs.length) {
          currentDirChange[d] = {
            ...(currentDirChange[d] || {}),
            [addDir]: {},
          };
          return;
        }
        currentDirChange = currentDirChange[d];
      });
    }
    if (a.match(file)) {
      const addFile = file.exec(a)[1];
      const currentDir = currentDirs[0];
      files[currentDir] = [...(files[currentDir] || []), parseFloat(addFile)];
    }
  });
  // files["gzlpvdhd"] = [0]; //74736;
  // files["qzcdscbp"] = [0];
  // files["rfgvg"] = [0]; //142825
  return { dirs, files };
}
