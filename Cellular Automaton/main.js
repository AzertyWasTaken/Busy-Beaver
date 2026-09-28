"use strict";
import path from "path";
import url from "url";
import {fileWriter} from "../writer2.js";
import {enumerate} from "./treeNormalForm.js";
import {newProgram} from "./runner.js";
import {unparse, parse} from "./parser.js";

// Deciders
import {decide as C} from "./Deciders/cycler.js";
import {decide as S} from "./Deciders/symmetry.js";
import {decide as MR} from "./Deciders/modularReduction.js";
import {decide as CS} from "./Deciders/closedSymbols.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (symbol, size) => size > 2
    ? `BBCA(${symbol},${size}).txt`
    : `BBCA(${symbol}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

// await value.newList(100_000, 4, true, [S, MR, CS, [C, 100]], 2, 3);

await value.decideList(true, [S], 2, 5);

// console.log(MR(parse("1011100-000010--")));
