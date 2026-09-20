"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");

    return Array.from(code, (c) =>
        /^\d+$/.test(c) ? Number(c) : c
    );
}

export function unparse(code) {
    return code.map((sym) =>
        sym === "*" || sym === "/"
        ? sym
        : parseInt(sym)
    ).join("");
}
