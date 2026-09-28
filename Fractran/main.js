"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./Outdated/treeNormalForm.js";
import {newProgram} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer2.js";

// Deciders
import {decide as TC} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (states, symbols) => symbols > 2
    ? `BBf(${states},${symbols}).txt`
    : `BBf(${states}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

await value.newList(100_000, 100, false, [], 7);

// await value.decideList(false, [RS], 4);

// console.log(RS(parse("A_B")));
