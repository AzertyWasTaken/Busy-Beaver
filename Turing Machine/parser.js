"use strict";
function parseState(stateCode) {
    const state = (i) => parseInt(i);
    const move = (i) => ({R: 1, L: -1}[i] ?? 0);
    const symbol = (i) => i.charCodeAt(0) - 65;

    const parsed = [];
    for (let i = 0; i < stateCode.length; i += 3) {
        const isUndefined = stateCode.slice(i, i + 3).includes("-");

        parsed.push(isUndefined ? [] : [
            state(stateCode[i]),
            move(stateCode[i + 1]),
            symbol(stateCode[i + 2]),
        ]);
    }
    return parsed;
}

export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const statesRules = code.split("_");

    for (let i = 0; i < statesRules.length; i++) {
        parsed.push(parseState(statesRules[i]))
    }
    return parsed;
}

export function unparse(code) {
    const state = (i) => i.toString();
    const move = (i) => new Map([[-1, "L"], [1, "R"]]).get(i) ?? "I";
    const symbol = (i) => String.fromCharCode(i + 65);

    return code.map((st) =>
        st.map((sy) =>
            sy.length < 3
            ? "---"
            : state(sy[0]) + move(sy[1]) + symbol(sy[2])
        ).join("")
    ).join("_");
}
