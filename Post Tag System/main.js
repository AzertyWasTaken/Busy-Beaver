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
import {decide as EI} from "./Deciders/evenIndices.js";
import {decide as IS} from "./Deciders/immortalSubstring.js";
import {decide as DR} from "./Deciders/duplicateRule.js";
import {decide as ER} from "./Deciders/emptyRules.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBPT(${size}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

// await value.newList(100_000, 1_000, false, [EI, ER, DR, [IS, 20, 2, 10, 20], [TC, 100], [C, 1_000]], 8);

await value.decideList(true, [[C, 100_000]], 9);

// value.reviewDecider(1_000, [C, 1_000], 7);

// console.log(IS(parse("101_20_1"), 1_000, 100, 20, 50));
