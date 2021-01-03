class CopyWorker {
    constructor(head) {
        this.originalHead = head;
        this.copiedhead = null;
        this.hashTable = new Map();
        this.initialOriginalPointer = head;
        this.initialCopiedPointer = null;
    }

    _copyEle() {
        let count = 0;
        while(this.originalHead) {
            let node;
            if (count === 0) {
                node = this.initialCopiedPointer = new Node(this.originalHead.val);
            } else {
                node = new Node(this.originalHead.val);
            }
            this.hashTable.set(this.originalHead, node);
            this.originalHead = this.originalHead.next;
            count++;
        }
    }

    _copyLinkage() {
        this.originalHead = this.initialOriginalPointer;
        this.copiedhead = this.initialCopiedPointer;
        while(this.originalHead) {
            const next = this.originalHead.next ? this.hashTable.get(this.originalHead.next) : null;
            const random = this.originalHead.random ? this.hashTable.get(this.originalHead.random) : null;
            this.copiedhead.next = next;
            this.copiedhead.random = random;
            this.originalHead = this.originalHead.next;
            this.copiedhead = this.copiedhead.next;
        }
    }

    copy1() {
        this._copyEle();
        this._copyLinkage();
    }

    copy2() {
        while(this.originalHead) {
            const node = this.originalHead;
            const copied = new Node(this.originalHead.val, node.next);
            node.next = copied;
            this.originalHead = this.originalHead.next.next;
        }
        this.originalHead = this.initialOriginalPointer;
        while(this.originalHead) {
            const node = this.originalHead;
            node.next.random = node.random ? node.random.next : null;
            this.originalHead = this.originalHead.next.next;
        }
        this.originalHead = this.initialOriginalPointer;
        this.copiedhead = this.initialCopiedPointer = this.originalHead.next;
        while(this.originalHead) {
            this.originalHead.next = this.originalHead.next ? this.originalHead.next.next : null;
            this.copiedhead.next = this.originalHead.next? this.originalHead.next.next : null;
            this.originalHead = this.originalHead.next;
            this.copiedhead = this.copiedhead.next;
        }

    }

    getCopiedList() {
        return this.initialCopiedPointer;
    }
}

class Node {
    constructor(val, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

const head = new Node(7);
head.next = new Node(13);
head.next.next = new Node(11);
head.next.next.next = new Node(10);

head.random = head.next.next;
head.next.random = head.next.next.next;
head.next.next.random = head.random;

const copyWorker = new CopyWorker(head);
copyWorker.copy2();
copyWorker.getCopiedList();
