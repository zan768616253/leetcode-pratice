var mostCommonWord = function(paragraph, banned) {
    const map = {};
    let max = 0;
    let target = '';
    const pArray = paragraph.toLowerCase().replace(/\!|\?|\'|\,|\;|\./g, ' ').replace(/\s+/g, ' ').split(' ')
    for(let i = 0; i < pArray.length; i++) {
        const key = pArray[i];
        if (banned.indexOf(key) === -1) {
            map[key] = map[key] ? map[key] + 1 : 1;
        }
    }
    for (const key in map) {
        if (map[key] > max) {
            max = map[key];
            target = key;
        }
    }
    return target;
};

