"use strict";
import path from "path";
import url from "url";
import {fileWriter} from "../writer.js";
import {enumerate} from "./enumerator.js";
import {newAutomaton} from "./runner.js";
import {unparse, parse} from "./parser.js";

// Deciders
import {decCycler} from "./Deciders/cycler.js";
import {decGlider} from "./Deciders/glider.js";
import {decHaltingRule} from "./Deciders/haltingRule.js";
import {decSymmetry} from "./Deciders/symmetry.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `peBBle(${size}).txt`,
    enumerate,
    newAutomaton,
    parse,
    unparse
);

// await value.newList(100_000, 100, [decSymmetry, decHaltingRule, decGlider, decCycler], 6);

await value.decideList(0, [decGlider], 5);
