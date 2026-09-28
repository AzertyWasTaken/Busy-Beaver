"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newProgram} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer2.js";

// Deciders
import {decide as C} from "./Deciders/cycler.js";
import {decide as TC} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BlF(${size}).txt`,
    enumerate,
    newProgram,
    parse,
    unparse
);

await value.newList(100_000, 1_000, true, [[TC, 1_000], [C, 1_000]], 12);

// await value.decideList(1_000, [decTranslatedCycler], 10);
