class Node {
    constructor(value, neighbors = []) {
        this.value = value;
        this.neighbors = neighbors || [];
    }
}

class Graph {
    constructor() {
        /*
        this.graph[aaa] = {
            node,
            distance: 3
        };
        */
        this.graph = {};
    }

    addNode(node) {
        if (node instanceof Node) {
            this.graph[node.value] = {
                node, distance: -1
            }
        } else {
            const n = new Node(node);
            this.graph[node] = {
                node: n, distance: -1
            }
        }
    }

    getNode(word) {
        return this.graph[word];
    }

    getNeighbors(node) {
        if (node instanceof Node) {
            return node.neighbors.map(n => this.graph[n].node)
        } else {
            return this.graph[node].node.neighbors.map(n => {
                return this.graph[n].node
            });
        }
    }

    setDistance(node, level) {
        if(node instanceof String) {
            this.graph[node].distance = level;
        }
    }
}

class LadderFinder {
    constructor(beginWord, endWord, wordList) {
        this.g = null;
        this.beginWord = beginWord;
        this.endWord = endWord;
        this.wordList = wordList;
        this.wordLength = beginWord.length;
        this.shortest = null;
    }

    _isNeighbors(source, target, length) {
        let count = 0;
        for (let i = 0; i < length; i++) {
            if (source[i] === target[i]) count++;
        }
        return count === length - 1;
    }

    _calculateDistances(){
        const calculated = [];
        let q = this.g.getNeighbors(this.beginWord);
        let level = 0;
        this.g.setDistance(this.beginWord, level);

        while(q.length) {
            const tmpNodes = [];
            level++;
            let size = q.length;
            while (size > 0) {
                const node = q.shift();
                if (node.value === this.endWord) {
                    this.g.setDistance(this.endWord, level);
                    return level + 1;
                }
                if (calculated.indexOf(node.value) === -1) {
                    this.g.setDistance(node.value, level);
                    calculated.push(node.value);
                    tmpNodes.push(node);
                }
                size--;
            }
            for (let i = 0; i < tmpNodes.length; i++) {
                const node = tmpNodes[i];
                const neighbors = this.g.getNeighbors(node);
                q = [...q, ...neighbors]
            }
        }
        return 0;
    }

    initiateGraph() {
        if (this.wordList.indexOf(this.endWord) === -1) {
            this.shortest = 0;
            return;
        }
        this.g = new Graph();
        [this.beginWord, ...this.wordList].forEach(word => {
            const neighbors = this.wordList.filter(w => this._isNeighbors(word, w, this.wordLength));
            const node = new Node(word, neighbors);
            this.g.addNode(node);
        });
        this.shortest = this._calculateDistances();
    }

    getShortest () {
        return this.shortest;
    }
}

const ladders = new LadderFinder("hit", "cog", ["hot","dot","dog","lot","log","cog"]);
ladders.initiateGraph();
console.log(ladders.getShortest());
