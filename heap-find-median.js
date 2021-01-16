const MinComparator = (a, b) => { return a - b; }
const MaxComparator = (a, b) => { return b - a; }

class MedianFinder {
    constructor() {
        this.minHeap = new Heap(MinComparator)
        this.maxHeap = new Heap(MaxComparator)
    }

    addNum(num) {
        if(this.maxHeap.peek() === null || num < this.maxHeap.peek()) {
            this.maxHeap.add(num)
        } else {
            this.minHeap.add(num)
        }

        if(this.maxHeap.size - this.minHeap.size > 1) {
            const max = this.maxHeap.poll()
            this.minHeap.add(max)
        } else if (this.minHeap.size - this.maxHeap.size > 1) {
            const min = this.minHeap.poll()
            this.maxHeap.add(min)
        }
    }

    findMedian() {
        if(this.maxHeap.size > this.minHeap.size) {
            return this.maxHeap.peek();
        } else if(this.maxHeap.size < this.minHeap.size) {
            return this.minHeap.peek();
        } else {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        }
    }
}

class Heap {
    constructor(comparator) {
        this.size = 0
        this.values = []
        this.comparator = comparator || MinComparator
    }

    add(val) {
        this.values.push(val);
        this.size++;
        this.bubbleUp();
    }

    peek() {
        return this.values[0] || null;
    }

    poll() {
        const res = this.values[0]
        const last = this.values.pop();
        this.size --;
        if (this.values.length) {
            this.values[0] = last;
            this.bubbleDown();
        }
        return res;
    }

    bubbleUp() {
        let index = this.values.length - 1;
        let parent = Math.floor((index - 1) / 2)

        while(this.comparator(this.values[index], this.values[parent]) < 0) {
            [this.values[parent], this.values[index]] = [this.values[index], this.values[parent]]
            index = parent;
            parent = Math.floor((index - 1) / 2)
        }
    }

    bubbleDown() {
        let index = 0;
        let size = this.values.length;

        while(true) {
            let left = null,
                right = null,
                swap = null,
                leftIndex = index * 2 + 1,
                rightIndex = index * 2 + 2;

            if (leftIndex < size) {
                left = this.values[leftIndex]
                if (this.comparator(left, this.values[index]) < 0) {
                    swap = leftIndex
                }
            }

            if (rightIndex < size) {
                right = this.values[rightIndex];
                if ((swap !== null && this.comparator(right, left) < 0) || (swap === null && this.comparator(right, this.values[index]))) {
                    swap = rightIndex;
                }
            }

            if (swap === null) {
                break;
            }

            [this.values[swap], this.values[index]] = [this.values[index], this.values[swap]]
            index = swap;
        }
    }
}


// [[],[-1],[],[-2],[],[-3],[],[-4],[],[-5],[]]
const finder = new MedianFinder();
finder.addNum(-1)
console.log(finder.findMedian())
finder.addNum(-2)
console.log(finder.findMedian())
finder.addNum(-3)
console.log(finder.findMedian())
finder.addNum(-4)
console.log(finder.findMedian())
finder.addNum(-5)
console.log(finder.findMedian())
