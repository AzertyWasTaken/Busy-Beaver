"use strict";
import path from "path";
import url from "url";
import {enumerateTNF} from "./treeNormalForm.js";
import {newTag} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decCyclicClosedRule} from "./Deciders/cyclicClosedRule.js";
import {decCycler} from "./Deciders/cycler.js";
import {decFirstRule} from "./Deciders/firstRule.js";
import {decIdenticalRule} from "./Deciders/identicalRule.js";
import {decEvenIndex} from "./Deciders/evenIndex.js";
import {decZeroEdge} from "./Deciders/zeroEdge.js";
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBPT(${size}).txt`,
    enumerateTNF,
    newTag,
    parse,
    unparse
);

// await value.newList(100_000, 1_000, [decFirstRule], 5);

await value.decideList(0, [decFirstRule], 8);
