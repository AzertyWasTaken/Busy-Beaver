"use strict";
export function enumerate(maxSize) {
    const code = [];
    const stack = [0];

    function* nextRule(currSize, remainNum) {
        if (currSize + remainNum < maxSize) {
            stack.push(stack.at(-1));
            code.push("*");
            yield* nextRule(currSize, remainNum + 1);
            code.pop();
            stack.pop();
        }

        // Check if the code is full
        if (currSize >= maxSize) {
            if (remainNum === 0) yield [code];
            return;
        }

        if (currSize + 1 < maxSize) {
            stack[stack.length - 1]++;
            code.push("/");
            yield* nextRule(currSize + 1, remainNum);
            code.pop();
            stack[stack.length - 1]--;
        }

        if (remainNum > 0) {
            const maxNum = stack.at(-1);
            stack.pop();
            for (let i = 0; i < maxNum; i++) {
                code.push(i);
                yield* nextRule(currSize + 1, remainNum - 1);
                code.pop();
            }
            stack.push(maxNum);
        }
    }

    return nextRule(0, 1);
}
