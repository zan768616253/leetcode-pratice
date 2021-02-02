var wordBreak1 = function(s, wordDict) {
    return breakWord(s, 0, [], wordDict);
};

const breakWord = (s, start, history, wordDict) => {
    if (start === s.length) {
        return true;
    }
    if ([true, false].indexOf(history[start]) > -1) {
        return history[start]
    }

    for (let i = start; i < s.length; i++) {
        const target = s.slice(start, i + 1)
        if (wordDict.indexOf(target) > -1 && breakWord(s, i + 1, history, wordDict)) {
            history[start] = true;
            return true;
        }
    }
    history[start] = false;
    return false;
}

console.log(wordBreak1("catsandog", ["cats", "dog", "sand", "and", "cat"]))

var wordBreak2 = function(s, wordDict) {
    const dp = Array(s.length).fill(false);
    dp.unshift(true);

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordDict.includes(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length]
};

console.log(wordBreak2("catsandog", ["cats", "dog", "sand", "and", "cat"]))
