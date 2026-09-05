"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newMachine} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (states, symbols) => symbols > 2
    ? `BBR(${states},${symbols}).txt`
    : `BBR(${states}).txt`,
    enumerate,
    newMachine,
    parse,
    unparse
);

await value.newList(100_000, 1_000, [decTranslatedCycler], 7);

// await value.decideList(1_000, [decTranslatedCycler], 5);
