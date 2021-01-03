function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

class ReverseListHelper {
    constructor(head) {
        this.head = head;
        this.pre = null;
        this.current = null;
        this.firstEle = null;
    }

    reverse1() {
        if (this.head) {
            this.firstEle = this.pre = this.head;

            if (this.head.next) {
                this.head = this.head.next;
                while(this.head) {
                    this.current = this.head;
                    if (this.head.next) {
                        this.head = this.head.next;
                        this.current.next = this.pre;
                        this.pre = this.current;
                        this.current = this.head;
                    } else {
                        this.current.next = this.pre;
                        this.head = null;
                    }
                }
                this.firstEle.next = null;
                return this.current;
            }

            return this.pre;
        }
        return null;
    }

    reverse2() {
        this.firstEle = this.head;
        const node = this._recursiveReverse(this.head, null)
        return node;
    }

    _recursiveReverse(node, pre) {
        if (!node.next) {
            node.next = pre;
            return node;
        } else {
            let current = node;
            const post = node.next;
            current.next = pre;
            return this._recursiveReverse(post, current);
        }
    }
}

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

var reverseList = function(head) {
    const helper = new ReverseListHelper(head);
    return helper.reverse2();
};

reverseList(head);