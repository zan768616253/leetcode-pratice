const A = [8, 5, 3, 6, 7, 4];
let sorted = null;

class BubbleSorter {
    constructor(array) {
        this.array = array;
    }

    sort() {
        let loop = this.array.length;
        for (let m = loop - 1; m > -1; m--) {
            for (let n = 0; n < m; n++) {
                const current = this.array[n];
                const next = this.array[n + 1];
                if (current > next) {
                    this.array[n] = next;
                    this.array[n + 1] = current;
                }
            }
        }
        return this.array;
    }
}

sorted = (new BubbleSorter(A)).sort();
console.log(sorted);

class QuickSorter {
    constructor() {
    }

    sort(array) {
        if (array.length === 1) {
            return array;
        }

        const pivot = array[array.length  -1];
        const leftArr = [];
        const rightArr = [];
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < pivot) {
                leftArr.push(array[i])
            } else {
                rightArr.push(array[i])
            }
        }

        if (leftArr.length && rightArr.length) {
            return [...this.sort(leftArr), pivot, ...this.sort(rightArr)]
        } else if(leftArr.length) {
            return [...this.sort(leftArr), pivot]
        } else {
            return [ pivot, ...this.sort(rightArr)]
        }
    }
}

sorted = (new QuickSorter()).sort(A);
console.log(sorted);

class MergeSorter {
    constructor() {
    }

    sort(array) {
        if (array.length <= 1) {
            return array;
        }

        const middleIndex = Math.floor(array.length / 2);
        const leftArray = array.slice(0, middleIndex);
        const rightArray = array.slice(middleIndex);

        return this._merge(this.sort(leftArray), this.sort(rightArray));
    }

    _merge(leftArray, rightArray) {
        const output = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while ((leftIndex < leftArray.length) && (rightIndex < rightArray.length)) {
            const leftEl = leftArray[leftIndex];
            const rightEl = rightArray[rightIndex];
            if (leftEl < rightEl) {
                output.push(leftEl);
                leftIndex++;
            } else {
                output.push(rightEl);
                rightIndex++;
            }
        }

        return [...output, ...leftArray.slice(leftIndex), ...rightArray.slice(rightIndex)];
    }
}

sorted = (new MergeSorter()).sort(A);
console.log(sorted);