"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./treeNormalForm.js";
import {newProgram} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer2.js";

// Deciders
import {decide as C} from "./Deciders/cycler.js";
import {decide as TC} from "./Deciders/translatedCycler.js";
import {decide as CR} from "./Deciders/closedRule.js";
import {decide as Z} from "./Deciders/zeros.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBSS(${size}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

await value.newList(100_000, 100, false, [[Z], [C, 100], [TC, 100]], 6);

// await value.decideList(true, [[TC, 100]], 8);

// value.reviewDecider(100, [TC, 100], 7);

// console.log(TC(parse("0000>"), 100));
