var longestPalindrome = function(s) {
    if (!s) {
        return "";
    }

    let i = 0;
    let maxStr = ''
    while (i < s.length - 1) {
        let tmp = '';
        const first = expandAroundCenter(s, i, i);
        const second = expandAroundCenter(s, i, i + 1);
        if (first.length > second.length) {
            tmp = first;
        } else {
            tmp = second
        }

        if (tmp.length > maxStr.length) {
            maxStr = tmp
        }

        i++;
    }

    if (maxStr.length) {
        return maxStr;
    } else {
        return s[0]
    }
};

const expandAroundCenter = function (s, L, R) {
    let tmp = '';
    while (L >= 0 && R < s.length) {
        if (s[L] === s[R]) {
            tmp = s.slice(L, R + 1);
        } else {
            break;
        }
        L--;
        R++;
    }
    return tmp
}

longestPalindrome("bb");
