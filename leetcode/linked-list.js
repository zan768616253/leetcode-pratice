class LinkedListNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    add(data) {
        const newNode = new LinkedListNode(data);
        if (this.head) {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        } else {
            this.head = newNode;
        }
    }

    remove(index) {
        if ((this.head === null) || (index < 0)) {
            return null
        }

        if (index === 0) {
            const data = this.head.data;
            this.head = this.head.next;
            return data;
        }

        let current = this.head;
        let previous = null;

        let i = 0;
        while ((current !== null) && (i < index)) {
            previous = current;
            current = current.next;
            i++;
        }
        if (current !== null) {
            previous.next = current.next;
            return current.data;
        }
    }
}