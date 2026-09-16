"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const part = code.split("_");

    for (let i = 0; i < part.length; i++) {
        parsed.push(
            part[i] === "?" ? null : Array.from(part[i], (c) =>
                c === "-" ? null : Number(c)
            )
        );
    }
    return parsed;
}

export function unparse(code) {
    return code.map((prod) =>
        prod === null ? "?" : prod.map((sym) =>
            sym === null ? "-" : sym
        ).join("")
    ).join("_");
}
