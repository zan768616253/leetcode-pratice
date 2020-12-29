const reverseKGroup = function(head, k) {
    const result = reverseUnit(head, k);
    return result
};

const reverseUnit = function(head, k) {
    const group = [];
    if (!head) {
        return null;
    }
    for (let i = 0; i < k; i++) {
        if (head.next || (i === k - 1 && head)) {
            group.push(head);
            head = head.next;
        } else if (!head.next && i < k - 1) {
            group.push(head);
            return group[0]
        }
    }
    for (let i = group.length - 1; i > 0; i--) {
        group[i].next = group[i - 1]
    }
    if(group[0]) {
        group[0].next = reverseUnit(head, k);
    } else {
        group[0] = null;
    }
    return group[group.length - 1];
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

const l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(4);

const l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4);

const l3 = new ListNode(1);
l3.next = new ListNode(2);
l3.next.next = new ListNode(3);
l3.next.next.next = new ListNode(4);
l3.next.next.next.next = new ListNode(5);

reverseKGroup(l3, 1);