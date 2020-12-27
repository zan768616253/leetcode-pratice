class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    addNode (node) {
        if (node.value < this.value) {
            if (this.left) {
                this.left.addNode(node);
            } else {
                this.left = node;
            }
        } else if (node.value > this.value) {
            if (this.right) {
                this.right.addNode(node);
            } else {
                this.right = node;
            }
        }
    }

    visit() {
        if (this.left) {
            this.left.visit()
        }
        console.log(this.value);
        if (this.right) {
            this.right.visit();
        }
    }

    search(val) {
        if (this.value === val) {
            return this;
        }
        if (this.left && (val < this.value)) {
            return this.left.search(val);
        } else if (this.right && (val > this.value)) {
            return this.right.search(val);
        }
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    addValue(val) {
        const node = new Node(val);
        if (this.root) {
            this.root.addNode(node);
        } else {
            this.root = node;
        }
    }

    // inOrderTraverse(node) {
    //     node = node ? node : this.root;
    //     if (node.left) {
    //         this.inOrderTraverse(node.left);
    //     }
    //     console.log(node.value);
    //     if (node.right) {
    //         this.inOrderTraverse(node.right);
    //     }
    // }

    inOrderVisit() {
        this.root.visit();
    }

    search(val) {
        return this.root.search(val)
    }
}

const setup = function () {
    const tree = new BST();
    tree.addValue(5);
    tree.addValue(3);
    tree.addValue(7);
    tree.addValue(6);
    tree.addValue(9);
    tree.addValue(2);
    tree.addValue(1);

    // tree.inOrderTraverse();
    tree.inOrderVisit();
    let node;
    node = tree.search(3);
    console.log(node)
};




