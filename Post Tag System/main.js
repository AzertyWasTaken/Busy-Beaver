"use strict";
import path from "path";
import url from "url";
import {enumerateTNF} from "./treeNormalForm.js";
import {newTag} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decImmortalSubstring} from "./Deciders/immortalSubstring.js";
import {decCycler} from "./Deciders/cycler.js";
import {decFirstRule} from "./Deciders/firstRule.js";
import {decIdenticalRule} from "./Deciders/identicalRule.js";
import {decClosedEdge} from "./Deciders/closedEdge.js";
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";
import {decZeroOneZero} from "./Deciders/zeroOneZero.js";
import {decEvenIndex} from "./Deciders/evenIndex.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBPT(${size}).txt`,
    enumerateTNF,
    newTag,
    parse,
    unparse
);

// await value.newList(100_000, 1_000, [decFirstRule, decIdenticalRule, decEvenIndex, decClosedEdge, decZeroOneZero, decImmortalSubstring, decTranslatedCycler, decCycler], 6);

await value.decideList(0, [decTranslatedCycler], 8);

// console.log(decImmortalSubstring(parse("120221_0_2")));
