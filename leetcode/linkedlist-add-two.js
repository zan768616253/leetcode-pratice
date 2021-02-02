var addTwoNumbers = function(l1, l2) {
    let plusOne = false;
    let l3 = null;
    let tmpL3 = null;
    let l3Array = [];
    while(l1 || l2) {
        const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + (plusOne ? 1 : 0);
        const val = sum % 10;
        plusOne = sum > 9;
        l3Array.push(new ListNode(val));
        l1 = l1 && l1.next ? l1.next : null;
        l2 = l2 && l2.next ? l2.next : null;
    }
    if (plusOne) {
        l3Array.push(new ListNode(1));
    }
    for (let i = 0; i < l3Array.length; i++) {
        if (i === 0) {
            l3 = l3Array[i];
            tmpL3 = l3Array[i];
        } else {
            tmpL3.next = l3Array[i];
            tmpL3 = tmpL3.next;
        }
    }
    return l3;
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

addTwoNumbers(l1, l2);