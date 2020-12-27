const preOrder = [1, 2, 4, 8, 9, 10, 11, 5, 3, 6, 7];
const inOrder = [8, 4, 10, 9, 11, 2, 5, 1, 6, 3, 7];

// const preOrder = [2, 1, 3];
// const inOrder = [1, 2, 3];

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    addRootNode(node) {
        this.root = node;
    }
}

class BSTBuilder {
    constructor(preOrder, inOrder) {
        this.preOrder = preOrder;
        this.inOrder = inOrder;
        this.length = inOrder.length;
        this.root = new Node();
        this.tree = new BST();
    }

    build(preStart, inStart, inEnd) {
        let node = null;
        if ((preStart < this.length) && (inStart <= inEnd)) {
            const middleIndex = this.inOrder.indexOf(this.preOrder[preStart]);
            const current = this.preOrder[preStart];
            node = new Node(current);
            node.left = this.build(preStart + 1, inStart, middleIndex - 1);
            node.right = this.build(preStart + middleIndex - inStart + 1, middleIndex + 1, inEnd);
            preStart++;
        }
        return node;
    }
}

const builder = new BSTBuilder(preOrder, inOrder);
const root = builder.build(0, 0, preOrder.length - 1);
console.log(root);
