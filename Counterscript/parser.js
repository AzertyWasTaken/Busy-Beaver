"use strict";
function findOpeningBracket(code, state) {
    let stack = 0;
    for (let index = state - 1; index >= 0; index--) {
        const element = code[index][0];
        if (element === "}") {
            stack++;
        }
        else if (element === "w") {
            if (stack === 0) return index;
            stack--;
        }
    }
}

export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const instructions = code.match(/[^_{}]+{|}|[^_{}]+/g);

    for (let i = 0; i < instructions.length; i++) {
        const [type, counter] = instructions[i];

        function getStr() {
            switch (type) {
                case "+":
                    return [0, counter.charCodeAt(0) - 65];
                case "-":
                    return [1, counter.charCodeAt(0) - 65];
                case "w":
                    return [2, counter.charCodeAt(0) - 65];
                case "}":
                    const openIdx = findOpeningBracket(instructions, i);
                    parsed[openIdx][2] = i;
                    return [3, instructions[openIdx].charCodeAt(1) - 65, openIdx];
                case "#":
                    return null;
            }
        }

        parsed.push(getStr());
    }
    return parsed;
}

export function unparse(code) {
    return code.map((instr) => {
        if (instr === null) return "##";
        const counter = String.fromCharCode(instr[1] + 65);

        switch (instr[0]) {
            case 0: return `+${counter}`;
            case 1: return `-${counter}`;
            case 2: return `w${counter}{`;
            case 3: return `}`;
        }
    }).reduce((text, token, index, tokens) => {
        const previous = tokens[index - 1];
        // Braces already delimit tokens, so "_" only follows plain instructions.
        const separated = index > 0 && previous.at(-1) !== "{" && token !== "}";

        return text + (separated ? "_" : "") + token;
    }, "");
}
