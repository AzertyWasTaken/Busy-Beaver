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
import {decFirstRule} from "./Deciders/firstRule.js";
import {decConsecutiveZeros} from "./Deciders/consecutiveZeros.js";
import {decConsecutiveOnes} from "./Deciders/consecutiveOnes.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBCT(${size}).txt`,
    enumerate,
    newTag,
    parse,
    unparse
);

// await value.newList(100_000, 1_000, [decConsecutiveOnes, decConsecutiveZeros, decFirstRule, decNondecreasing, decCycler], 14);

// await value.decideList(100_000, [], 10);
