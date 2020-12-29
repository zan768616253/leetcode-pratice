var isValid = function(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (values[char]) {
            stack.push(values[char])
        } else {
            if (stack.pop() !== char) {
                return false;
            }
        }
    }
    if (stack.length === 0)
        return true;
    return false;
};

const values = {
    "(": ")",
    "[": "]",
    "{": "}",
};

isValid("(([]){})");
