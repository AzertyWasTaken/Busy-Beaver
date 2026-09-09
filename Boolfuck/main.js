"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newMachine} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decCycler} from "./Deciders/cycler.js";
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `B2F(${size}).txt`,
    enumerate,
    newMachine,
    parse,
    unparse
);

await value.newList(100_000, 1_000, [decCycler, decTranslatedCycler], 12);

// await value.decideList(1_000, [decTranslatedCycler], 10);
