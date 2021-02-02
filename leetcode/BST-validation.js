function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var isValidBST = function(root) {
    return validate(root, null, null)
};

var validate = function(root, high, low) {
    if(!root) {
        return true;
    }

    if(low && root.val <= low) {
        return false;
    }

    if(high && root.val >= high) {
        return false;
    }

    if (root.left && root.left.val >= root.val) {
        return false;
    }

    if (root.right && root.right.val <= root.val) {
        return false;
    }

    return validate(root.left, root.val, low) && validate(root.right, high, root.val)
};

// function validate(root, low, high) {
//     if (root == null) {
//         return true;
//     }
//     if ((low != null && root.val <= low) || (high != null && root.val >= high)) {
//         return false;
//     }
//     return validate(root.right, root.val, high) &&
//         validate(root.left, low, root.val);
// }

// const root1 = new TreeNode(
//     3,
//     new TreeNode(1),
//     new TreeNode(5),
// );
//
// root1.right.left = new TreeNode(4);
// root1.right.right = new TreeNode(6);
//
// root1.left.left = new TreeNode(0);
// root1.left.right = new TreeNode(2);

const root1 = new TreeNode(
    5,
    new TreeNode(4),
    new TreeNode(6),
);

root1.right.left = new TreeNode(3);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(
    2,
    new TreeNode(1),
    new TreeNode(3)
)

console.log(isValidBST(root1));