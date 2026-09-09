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
    (size) => `BBCS(${size}).txt`,
    enumerateTNF,
    newMachine,
    parse,
    unparse
);

await value.newList(100_000, 1_000, [decTranslatedCycler], 9);

// await value.decideList(1_000, [decTranslatedCycler], 6);
