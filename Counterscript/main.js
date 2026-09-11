"use strict";
import path from "path";
import url from "url";
import {enumerateTNF} from "./treeNormalForm.js";
import {newMachine} from "./runner.js";
import {unparse, parse} from "./parser.js";
import {fileWriter} from "../writer.js";

// Deciders
import {decTranslatedCycler} from "./Deciders/translatedCycler.js";
import {decLoopEnding} from "./Deciders/loopEnding.js";

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (size) => `BBCS(${size}).txt`,
    enumerateTNF,
    newMachine,
    parse,
    unparse
);

await value.newList(100_000, 1_000, [decLoopEnding, decTranslatedCycler], 10);

// await value.decideList(1_000, [decLoopEnding], 9);

// console.log(decLoopDecrementOrder(parse("+A_wA{+A_wA{-A_+B}_wB{+A_-B}}")));
