"use strict";
import path from "path";
import url from "url";
import {enumerateTNF} from "./treeNormalForm.js";
import {newMachine} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decCycler} from "./Deciders/cycler.js";
import {decHaltingPath} from "./Deciders/haltingPath.js";
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";
import {decUnusedSymbol} from "./Deciders/unusedSymbol.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (states, symbols) => symbols > 2
    ? `BB(${states},${symbols}).txt`
    : `BB(${states}).txt`,
    enumerateTNF,
    newMachine,
    parse,
    unparse
);

// await value.newList(100_000, 1_000, [], 2, 2);

await value.decideList(1_000, [], 4, 2);
