"use strict";
import path from "path";
import url from "url";
import {fileWriter} from "../writer.js";
import {enumerateTNF} from "./treeNormalForm.js";
import {newAutomaton} from "./runner.js";
import {unparse, parse} from "./parser.js";

// Deciders

const value = fileWriter(
    path.dirname(url.fileURLToPath(import.meta.url)),
    (symbol, size) => size > 2
    ? `BBCA(${symbol},${size}).txt`
    : `BBCA(${symbol}).txt`,
    enumerateTNF,
    newAutomaton,
    parse,
    unparse
);

// await value.newList(100_000, 100, [], 4, 2);

await value.decideList(0, [], 2, 4);
