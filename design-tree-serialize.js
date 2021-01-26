function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var serialize = function(root) {
    if (!root) {
        return []
    }
    const q = [root]

    const result = []
    while(q.length) {
        let size = q.length
        while(size) {
            const node  = q.shift()

            if (node) {
                result.push(node.val)
                const left = node.left
                const right = node.right
                q.push(...[left, right])
            } else {
                result.push(null)
            }

            size --;
        }
    }

    return result;
};

var deserialize = function(data) {
    if (data.length === 0) {
        return null;
    }
    const root = new TreeNode(data[0])
    const q = [root]
    let i = 0;
    while(q.length) {
        let size = q.length
        while(size) {
            const node = q.shift();
            i++
            const left = data[i]
            if (i < data.length && left !== null) {
                const leftNode = new TreeNode(left)
                node.left = leftNode;
                q.push(leftNode)
            }
            i++;
            const right = data[i]
            if (i < data.length && right !== null) {
                const rightNode = new TreeNode(right)
                node.right = rightNode;
                q.push(rightNode)
            }
            size--;
        }
    }
    return root;
};


const root = deserialize([4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2])
const data = serialize(root)
console.log(data)
