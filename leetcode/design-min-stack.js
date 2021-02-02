class MinStack1{
    constructor() {
        this.stack = []
    }

    push(x) {
        if (this.stack.length === 0) {
            this.stack.push([x, x])
        } else {
            const last = this.stack[this.stack.length - 1]
            const min = last[1]
            if (min < x) {
                this.stack.push([x, min])
            } else {
                this.stack.push([x, x])
            }
        }
    }

    pop(){
        this.stack.pop()
    }

    top() {
        return this.stack[this.stack.length - 1][0]
    }

    getMin() {
        return this.stack[this.stack.length - 1][1]
    }
}

class MinStack2{
    constructor() {
        this.stack = []
        this.minStack = []
    }

    push(x) {
        this.stack.push(x)
        if (this.minStack.length) {
            if (x <= this.minStack[this.minStack.length - 1]) {
                this.minStack.push(x)
            }
        } else {
            this.minStack.push(x)
        }
    }

    pop(){
        const current = this.stack.pop()
        if (current === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop()
        }
    }

    top() {
        return this.stack[this.stack.length - 1]
    }

    getMin() {
        return this.minStack[this.minStack.length - 1]
    }
}

const terms = ["MinStack","push","push","push","getMin","pop","top","getMin"];
const data = [[],[-2],[0],[-3],[],[],[],[]]

let minStack;
for (let i = 0; i < terms.length; i++) {
    if (i === 0) {
        minStack = new MinStack2(data[i][0]);
    } else {
        if (terms[i] === 'push') {
            console.log(minStack.push(data[i][0], data[i][1]));
        } else if (terms[i] === 'getMin'){
            console.log(minStack.getMin());
        } else if (terms[i] === 'pop') {
            console.log(minStack.pop());
        } else {
            console.log(minStack.top());
        }
    }
}
