class Helper {
    constructor(jobDifficulty, d) {
        this.dp = []
        this.jobDifficulty = jobDifficulty
        this.d = d;
    }

    calculate() {
        return this.splitWork(this.jobDifficulty, 0, this.d);
    }

    splitWork (jobDifficulty, start, day) {
        if (jobDifficulty.length - start < day) {
            return -1;
        }

        if (day === 1) {
            return Math.max(...jobDifficulty.slice(start));
        }

        if (this.dp[start] && this.dp[start][day]) {
            return this.dp[start][day];
        }
        let min = Number.MAX_SAFE_INTEGER;
        for (let i = start + 1; i <= jobDifficulty.length - (day - 1); i++) {
            const diff = Math.max(...jobDifficulty.slice(start, i))
            const rest = this.splitWork(jobDifficulty, i, day - 1);
            if (rest > 0) {
                const result = rest + diff;
                min = Math.min(min, result);
            } else {
                min = -1
            }
        }
        if (this.dp[start]) {
            this.dp[start][day] = min
        } else {
            this.dp[start] = {}
            this.dp[start][day] = min
        }
        return min;
    }
}

const minDifficulty = function(jobDifficulty, d) {
    const helper = new Helper(jobDifficulty, d)
    return helper.calculate();
};
