class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.dummyHead = new Node(-1, -1, Number.MIN_SAFE_INTEGER)
        this.dummyEnd= new Node(-1,-1,  Number.MAX_SAFE_INTEGER)
        this.dummyHead.right = this.dummyEnd
        this.dummyEnd.left = this.dummyHead
    }

    put(key, value){
        if (this.capacity > 0) {
            if (this.map.has(key)) {
                let node = this.map.get(key)
                node.val = value;
                node.frequency = node.frequency + 1;
                this._adjustNodePosition(node);
            } else {
                const node = new Node(key, value)

                if (this.map.size === this.capacity) {
                    const toDelete = this.dummyHead.right;

                    this.dummyHead.right = node
                    node.left = this.dummyHead

                    toDelete.right.left = node
                    node.right = toDelete.right

                    const toDeleteKey = toDelete.key;
                    this.map.delete(toDeleteKey);
                } else {
                    const right = this.dummyHead.right;

                    this.dummyHead.right = node
                    node.left = this.dummyHead

                    node.right = right
                    right.left = node
                }

                this._adjustNodePosition(node);
                this.map.set(key, node);
            }
        }
    }

    get(key) {
        if(this.map.has(key)) {
            let node = this.map.get(key)
            node.frequency = node.frequency + 1;
            this._adjustNodePosition(node);
            return node.val
        } else {
            return -1
        }
    }

    _adjustNodePosition(node) {
        while (node.frequency >= node.right.frequency) {
            let right = node.right;
            let rightRight = node.right.right;
            let left = node.left;

            left.right = right;
            right.left = left;
            right.right = node;
            node.left = right;
            node.right = rightRight;
            rightRight.left = node;
        }
    }
}

class Node {
    constructor(key, val, frequency) {
        this.key = key
        this.val = val
        this.frequency = frequency || 1
        this.left = this.right = null
    }
}

const terms = ["LFUCache","put","get"];
const data = [[0],[0,0],[0]]

let lFUCache;
for (let i = 0; i < terms.length; i++) {
    if (i === 0) {
        lFUCache = new LFUCache(data[i][0]);
    } else {
        if (terms[i] === 'put') {
            console.log(lFUCache.put(data[i][0], data[i][1]));
        } else {
            console.log(lFUCache.get(data[i][0]));
        }
    }
}
