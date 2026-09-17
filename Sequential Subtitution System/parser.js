"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const part = code.split("_");

    for (let i = 0; i < part.length; i++) {
        const [input, output] = part[i].split(">");
        parsed.push([
            Array.from(input, (c) =>
                Number(c)
            ),
            Array.from(output, (c) =>
                Number(c)
            )
        ]);
    }
    return parsed;
}

export function unparse(code) {
    return code.map((prod) =>
        prod.map((side) =>
            side.map((sym) =>
                sym
            ).join("")
        ).join(">")
    ).join("_");
}
