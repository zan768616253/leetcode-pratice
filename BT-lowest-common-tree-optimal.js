function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

class commonAncestorFinderOpt1 {
    constructor(root, p, q) {
        this.root = root;
        this.p = p;
        this.q = q;

        this.pLevel = -1;
        this.qLevel = -1;
        this.pPath = []; // [3, 5]
        this.qPath = []; // [3, 1]

        this.graph = {}
    }

    _findLCA(node) {
        if (!node) return null;
        if (node.val === this.q.val || node.val === this.p.val) {
            return node;
        }

        const leftResult = this._findLCA(node.left);
        const rightResult = this._findLCA(node.right);

        if (!leftResult) return rightResult;
        if (!rightResult) return leftResult;

        return node;
    }

    find() {
        return this._findLCA(this.root);
    }
}

class commonAncestorFinder extends commonAncestorFinderOpt1 {
    constructor(root, p, q) {
        super(root, p, q);
    }
}

const kaka = new TreeNode(37);

kaka.left = new TreeNode(-34);
kaka.right = new TreeNode(-48);

// kaka.left.left = new TreeNode(6);
kaka.left.right = new TreeNode(-100);
kaka.right.left = new TreeNode(-101);
kaka.right.right = new TreeNode(48);

kaka.right.right.left = new TreeNode(54);

kaka.right.right.left.left = new TreeNode(71);
kaka.right.right.left.right = new TreeNode(-22);

kaka.right.right.left.right.right = new TreeNode(8);

var lowestCommonAncestor = function(root, p, q) {
    const finder = new commonAncestorFinder(root, p, q);
    return finder.find();
};

lowestCommonAncestor(kaka, kaka.right.right.left.left, kaka.right.right.left.right.right);