"use strict";
import path from "path";
import url from "url";
import {enumerate} from "./enumerator.js";
import {newTag} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decCycler} from "./Deciders/cycler.js";
import {decNondecreasing} from "./Deciders/nondecreasing.js";
import {decConsecutiveSymbol} from "./Deciders/consecutiveSymbol.js";
import {decIdenticalRule} from "./Deciders/identicalRule.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBPT(${size}).txt`,
    enumerate,
    newTag,
    parse,
    unparse
);

// await value.newList(100_000, 1_000, [], 2);

await value.decideList(10_000, [], 7);
