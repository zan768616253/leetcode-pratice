const lengthOfLongestSubstring = function(s) {
    let len = s.length;
    let aIndex = 0;
    let bIndex = 1;
    let max = 0;
    if (bIndex < len) {
        while (bIndex < len) {
            const subString = s.substring(aIndex, bIndex);
            if (subString.indexOf(s.charAt(bIndex)) > -1) {
                aIndex ++;
            } else {
                bIndex ++;
                max = subString.length + 1 > max ? subString.length + 1 : max;
            }
        }
    } else {
        max = s.length
    }
    return max;
};


lengthOfLongestSubstring(' ');