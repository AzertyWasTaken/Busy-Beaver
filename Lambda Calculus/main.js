"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newProgram} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer2.js";

// Deciders
import {decide as C} from "./Deciders/cycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBldb(${size}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

await value.newList(100_000, 100, true, [[C, 100]], 11);

// await value.decideList(true, [[C, 100]], 10);

// value.reviewDecider(1_000, [C, 1_000], 7);

// console.log(R(parse("/*/*00/*0*10"), 100));
