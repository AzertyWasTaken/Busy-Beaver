"use strict";
import path from "path";
import url from "url";
import {enumerateTNF} from "./treeNormalForm.js";
import {newMachine} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (states, symbols) => symbols > 2
    ? `BBf(${states},${symbols}).txt`
    : `BBf(${states}).txt`,
    enumerateTNF,
    newMachine,
    parse,
    unparse
);

await value.newList(100_000, 100, [decTranslatedCycler], 11);

// await value.decideList(1_000, [decTranslatedCycler], 8);
