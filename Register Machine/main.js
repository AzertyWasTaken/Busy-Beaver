"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./treeNormalForm.js";
import {newProgram} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer2.js";

// Deciders
import {decide as TC} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (states, symbols) => symbols > 2
    ? `MBB(${states},${symbols}).txt`
    : `MBB(${states}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

await value.newList(100_000, 100, false, [], 2);

// await value.decideList(1_000, [[TC, 100]], 5);
