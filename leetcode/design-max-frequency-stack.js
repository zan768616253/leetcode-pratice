/*
    Implement FreqStack, a class which simulates the operation of a stack-like data structure.

    FreqStack has two functions:

    push(int x), which pushes an integer x onto the stack.
    pop(), which removes and returns the most frequent element in the stack.
    If there is a tie for most frequent element, the element closest to the top of the stack is removed and returned.
*/

class FreqStack {
    constructor() {
        // counts (frequencies) for each num
        this.counts = {};
        // {freq: []} stack for each frequency
        this.map = {};
        // current max frequency
        this.max = 0;
    }

    push(x) {
        // increment count (freq) for this number
        if (!(x in this.counts))
            this.counts[x] = 0;
        this.counts[x]++;
        // set new max frequency (if need be)
        this.max = Math.max(this.max, this.counts[x]);
        // push this num to map's stack
        if (!(this.counts[x] in this.map))
            this.map[this.counts[x]] = [];
        this.map[this.counts[x]].push(x);
    }

    pop() {
        // get top of stack for current max frequency
        const x = this.map[this.max].pop();
        // decrement count for this number
        this.counts[x]--;
        // if stack at this frequency is empty, decrement max freq
        if (this.map[this.max].length === 0)
            this.max--;
        // return popped number
        return x;
    }
}

const terms = ["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"];
const data = [[],[5],[7],[5],[7],[4],[5],[],[],[],[]];

let freqStack;
for (let i = 0; i < terms.length; i++) {
    if (i === 0) {
        freqStack = new FreqStack();
    } else {
        if (terms[i] === 'push') {
            console.log(freqStack.push(data[i][0]));
        } else {
            console.log(freqStack.pop());
        }
    }
}

