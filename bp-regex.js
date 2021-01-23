Recursive

var isMatch = function(text, pattern) {
    const size = text.length;

    const match = function(t, p, index = 0) {
        if (t.length === 0 && p.length === 0) {
            return true
        }
        let m = null;
        const firstMatch = index < size && (p[0] === t[0] || p[0] === '.');
        if (p.length >= 2 && p[1] === '*') {
            const case1 = firstMatch && match(t.slice(1), p, index + 1)
            const case2 = match(t, p.slice(2), index)
            m = case1 || case2;
        } else {
            m = (firstMatch && match(t.slice(1), p.slice(1), index + 1))
        }
        return m
    }

    return match(text, pattern)
}

console.log(isMatch("aasdfasdfasdfasdfas", "aasdf.*asdf.*asdf.*asdf.*s"))

// DP - Top-Down

// const Result = {
//     TRUE: 'TRUE',
//     FALSE: 'FALSE'
// }
//
// var isMatch = function(text, pattern) {
//     const memo = Array.from({length: text.length + 1}, () => Array(pattern.length + 1).fill(null));
//
//     function dp (i, j, t, p) {
//         if (memo[i][j]) {
//             return memo[i][j] === Result.TRUE;
//         }
//         let ans;
//         if (j === p.length) {
//             ans = i === text.length;
//         } else {
//             const firstMatch = i < t.length && ((p[j] === t[i]) || (p[j] === '.'))
//
//             if (j + 1 < p.length && p[j + 1] === '*') {
//                 ans = (dp(i, j+2, text, pattern) || (firstMatch && dp(i + 1, j, text, pattern)));
//             } else {
//                 ans = firstMatch && dp(i + 1, j + 1, text, pattern);
//             }
//         }
//
//         memo[i][j] = ans ? Result.TRUE : Result.FALSE;
//         return ans;
//     }
//
//     return dp(0, 0, text, pattern);
// }
//
// console.log(isMatch("ab", ".*c"))
