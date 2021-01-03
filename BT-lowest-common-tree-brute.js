function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

class commonAncestorFinder {
    constructor(root, p, q) {
        this.root = root;
        this.p = p.val;
        this.q = q.val;

        this.pLevel = -1;
        this.qLevel = -1;
        this.pPath = []; // [3, 5]
        this.qPath = []; // [3, 1]

        this.graph = {}
    }

    _bfs() {
        let level = 0;

        const q = [ this.root ];
        while (q.length) {
            level++;
            let size = q.length;

            while (size > 0) {
                const node = q.shift();
                if (node) {
                    this.graph[node.val] = node;

                    if (node.val === this.p) {
                        this.pLevel = level;
                    }

                    if (node.val === this.q) {
                        this.qLevel = level;
                    }

                    if (this.pLevel > 0 && this.qLevel > 0) {
                        return;
                    }

                    const left = node.left;
                    const right = node.right;

                    if (left) {
                        q.push(left);
                    }
                    if (right) {
                        q.push(right);
                    }
                    size--;
                }
            }
        }
    }

    _preOrderTravers (node, target, targetValue, targetLevel, curLevel, path) {
        if (curLevel > targetLevel || !node) {
            return null;
        }

        if (node.val === targetValue) {
            if (target === 'p') {
                this.pPath = [...path, targetValue]
            } else {
                this.qPath = [...path, targetValue]
            }
            return path;
        }

        this._preOrderTravers(node.left, target, targetValue, targetLevel, curLevel + 1, [...path, node.val]);
        this._preOrderTravers(node.right, target, targetValue, targetLevel, curLevel + 1, [...path, node.val]);
        return null;
    }

    initialize() {
        this._bfs();
        this._preOrderTravers(this.root, 'p', this.p, this.pLevel, 0, []);
        this._preOrderTravers(this.root, 'q', this.q, this.qLevel, 0, []);
    }

    find() {
        const length = Math.min(this.pPath.length, this.qPath.length);
        for (let i = 0; i < length; i++) {
            if (this.pPath[i] !== this.qPath[i]) {
                return this.graph[this.pPath[i - 1]];
            }
        }
        return this.graph[this.pPath[length - 1]];
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
    finder.initialize();
    return finder.find();
};

lowestCommonAncestor(kaka, kaka.right.right.left.left, kaka.right.right.left.right.right);