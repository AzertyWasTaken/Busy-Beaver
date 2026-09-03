"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");
    return Array.from(code, (i) => i === "-" ? null : Number(i));
}

export function unparse(code) {
    return code.map((i) => i === null ? "-" : i).join("");
}
