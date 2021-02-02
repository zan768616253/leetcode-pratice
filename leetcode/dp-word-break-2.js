class ConcatenatedWordsFinder {
    constructor(words) {
        this.words = words;
    }

    find() {
        const results = []
        for (let i = 0; i < this.words.length; i++) {
            const word = this.words[i];
            const size = word.length;
            const dp = Array.from({length: size}, () => ({value: null, path: null}));

            for (let j = 0; j < size; j++) {
                const part = word.slice(0, j)
                if (this.words.includes(part)) {
                    if (this._bfs(word, j, this.words, [part], dp)) {
                        results.push(word)
                    }
                }
            }
        }

        return results;
    }

    _bfs(word, start, list, path, dp) {
        if(start === word.length) {
            return {value: true, path};
        }

        if (start > word.length - 1) {
            return null
        }

        const memory = dp[start]
        if (memory.value != null) {
            return memory
        }

        for (let i = start + 1; i <= word.length; i++) {
            const current = word.slice(start, i)
            if (list.includes(current)) {
                const currentPath = [current, ...path]
                const res = this._bfs(word, i, list, currentPath, dp)
                if (res && res.value) {
                    dp[start].value = true;
                    dp[start].path = currentPath;
                    return dp[start]
                }
            }
        }
        return false;
    }
}

var findAllConcatenatedWordsInADict = function(words) {
    const helper = new ConcatenatedWordsFinder(words);
    return helper.find()
};

findAllConcatenatedWordsInADict(["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"])


