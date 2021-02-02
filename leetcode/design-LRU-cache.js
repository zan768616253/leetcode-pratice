// /**
//  * @param {number} capacity
//  */
// var LRUCache = function(capacity) {
//     this.q = []
//     this.map = {}
//     this.capacity = capacity;
// };
//
// /**
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function(key) {
//     const index = this.q.indexOf(key)
//     this.q.push(...this.q.splice(index, 1))
//     return (!this.map[key] && this.map[key] !== 0) ? -1 : this.map[key];
// };
//
// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function(key, value) {
//     if (this.q.length === this.capacity) {
//         if (!this.map[key] && this.map[key] !== 0) {
//             const toDelete = this.q.shift()
//             delete this.map[toDelete]
//             this.q.push(key)
//         } else {
//             const index = this.q.indexOf(key)
//             this.q.push(...this.q.splice(index, 1))
//         }
//         this.map[key] = value;
//     } else {
//         if (!this.map[key] && this.map[key] !== 0) {
//             this.q.push(key)
//         } else {
//             const index = this.q.indexOf(key)
//             this.q.push(...this.q.splice(index, 1))
//         }
//         this.map[key] = value;
//     }
// };

// /* Use Map Feature-----------------------------------------------------------------------*/
// /**
//  * @param {number} capacity
//  */
// var LRUCache = function(capacity) {
//     this.map = new Map()
//     this.capacity = capacity;
//     this.firstItem = null;
// };
//
// /**
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function(key) {
//     if (this.map.has(key)) {
//         const val = this.map.get(key)
//         this.map.delete(key)
//         this.map.set(key, val);
//         return val;
//     } else {
//         return -1
//     }
// };
//
// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function(key, value) {
//     if (this.map.size === this.capacity) {
//         if (this.map.has(key)) {
//             this.map.delete(key)
//         } else {
//             const toDelete = this.map.keys().next().value
//             this.map.delete(toDelete)
//         }
//         this.map.set(key, value)
//     } else {
//         this.map.delete(key);
//         this.map.set(key, value);
//     }
// };


/* Use Linked List-----------------------------------------------------------------------*/

class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.left = this.right = null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.map = new Map();
    this.dummyEnd = new Node(-1, -1);
    this.dummyHead = new Node(-2, -2);
    this.dummyHead.right = this.dummyEnd
    this.dummyEnd.left = this.dummyHead
    this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.map.has(key)) {
        const node = this.map.get(key)
        this.adjustNode(node);
        return node.val;
    } else {
        return -1;
    }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        const node = this.map.get(key)
        node.val = value;
        this.adjustNode(node);
    } else {
        if (this.capacity === this.map.size) {
            const first = this.dummyHead.right;
            const right = first.right;
            first.left = null;
            first.right = null;
            this.dummyHead.right = right
            right.left = this.dummyHead
            this.map.delete(first.key)
        }
        const node = new Node(key, value)
        const tail = this.dummyEnd.left;
        tail.right = node
        this.dummyEnd.left = node;
        node.left = tail;
        node.right = this.dummyEnd
        this.map.set(key, node)
    }
};

LRUCache.prototype.adjustNode = function(node) {
    const left = node.left
    const right = node.right
    left.right = right
    right.left = left

    const tail = this.dummyEnd.left
    tail.right = node
    this.dummyEnd.left = node
    node.left = tail
    node.right = this.dummyEnd;
}


// const terms = ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"]
// const data = [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]

const terms = ["LRUCache","put","put","get","put","get","put","get","get","get"];
const data = [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]];

let lRUCache;
for (let i = 0; i < terms.length; i++) {
    if (i === 0) {
        lRUCache = new LRUCache(data[i][0]);
    } else {
        if (terms[i] === 'put') {
            console.log(lRUCache.put(data[i][0], data[i][1]));
        } else {
            console.log(lRUCache.get(data[i][0]));
        }
    }
}
