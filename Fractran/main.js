"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./tnfPruning.js";
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

// Enum -- 5: 6,628p 0.25s -- 6: 65,654p 0.8s
// TNF -- 7: 1,991p 3.5s -- 8: 22,414p 40s
// TNFV -- 7: 1,643p 1.5s -- 8: 14,267p 10.5s
// TNFO -- 8: 1,955p 1s -- 9: 13,479p 7.5s
// TNFP -- 8: 1,050p 0.9s -- 9: 6,018p 6.5s

await value.newList(100_000, 100, false, [], 9);

// await value.decideList(false, [RS], 4);

// console.log(RS(parse("A_B")));
