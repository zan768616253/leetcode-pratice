function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right)
}

const isSymmetric1 = function (root) {
    return isMirror(root, root);
};

const isMirror = function(t1, t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;

    return (t1.val === t2.val)
        && isMirror(t1.right, t2.left)
        && isMirror(t1.left, t2.right);
};

const isSymmetric2 = function (root) {
    const stack = [];
    stack.push(root.left);
    stack.push(root.right);
    while (stack.length > 0) {
        const left = stack.shift();
        const right = stack.shift();

        if (right === null && left === null) {
            return true;
        } else if (right === null || left === null) {
            return false
        }

        if (right.val !== left.val) {
            return false
        }

        stack.push(left.left);
        stack.push(right.right);
        stack.push(left.right);
        stack.push(right.left);
    }
};

