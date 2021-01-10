class Counter {
    constructor(height) {
        this.height = height;
    }

    calculate() {
        if (this.height === null || this.height.length === 0) {
            return 0
        }

        const left = [];
        let leftPeak = this.height[0];
        for (let i = 0; i < this.height.length; i++) {
            const value = leftPeak = Math.max(leftPeak, this.height[i]);
            left.push(value)
        }

        let right = [];
        let rightPeak = this.height[this.height.length - 1];
        for (let i = this.height.length - 1; i > -1; i--) {
            const value = rightPeak = Math.max(rightPeak, this.height[i]);
            right = [value, ...right]
        }

        let res = 0;
        for (let i = 0; i < this.height.length; i++) {
            const val = Math.min(left[i], right[i]) - this.height[i];
            res += val
        }

        return res;
    }
}

const counter = new Counter([4, 2, 3])
counter.calculate();
