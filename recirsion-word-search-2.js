// for saving the block
class Node {
    constructor(val, m, n) {
        this.val = val
        this.m = m
        this.n = n
        this.neighbors = []
    }

    setNeighbor(neighbor) {
        this.neighbors.push(neighbor)
    }
}

// Graph for saving the relationship between each node
class Graph {
    constructor() {
        this.graph = new Map()
    }

    constructKey(m, n) {
        return `${m}-${n}`
    }

    getNode(m, n) {
        return this.graph.get(this.constructKey(m, n))
    }

    setNode(m, n, node) {
        this.graph.set(this.constructKey(m, n), node)
    }
}

class WordFinder {
    constructor(board, words) {
        this.board = board
        this.words = words
        this.graph = new Graph();
    }

    buildGraph() {
        for (let m = 0; m < this.board.length; m++) {
            for (let n = 0; n < this.board[m].length; n++) {
                const node = new Node(this.board[m][n], m, n)
                // left
                if (n - 1 >= 0) {
                    node.setNeighbor([m, n - 1])
                }
                // right
                if(n + 1 < this.board[m].length) {
                    node.setNeighbor([m, n + 1])
                }
                // up
                if (m - 1 >= 0) {
                    node.setNeighbor([m - 1, n])
                }

                // down
                if (m + 1 < this.board.length) {
                    node.setNeighbor([m + 1, n])
                }

                // push node to graph
                this.graph.setNode(m, n, node)
            }
        }
    }

    search() {
        const res = []

        for (let i = 0; i < this.words.length; i++) {
            const word = this.words[i];
            if (this._searchWord(word)) {
                res.push(word)
            }
        }

        return res;
    }

    _searchWord(word) {
        const initialLetters = [];

        // locate the word first letters in the board
        for (let m = 0; m < this.board.length; m++) {
            for (let n = 0; n < this.board[m].length; n++) {
                if (word[0] === this.board[m][n]) {
                    initialLetters.push([m, n])
                }
            }
        }

        for (let i = 0; i < initialLetters.length; i++) {
            if (this._bfs(initialLetters[i], word)) {
                return true;
            }
        }

        return false;
    }

    _bfs([m, n], target, step = 1, current = []) {
        // all the char are found
        if (step === target.length) {
            return true;
        }
        const targetLetter = target[step]

        // get the node
        const node = this.graph.getNode(m, n);

        const neighbors = node.neighbors
            .map(n => {
                return this.graph.getNode(n[0], n[1])
            })
            .filter(neighbor => {
                return neighbor.val === targetLetter && current.indexOf(this.graph.constructKey(neighbor.m, neighbor.n)) === -1
            })
        if (neighbors.length === 0) {
            return false;
        }

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i]
            if (this._bfs([neighbor.m, neighbor.n], target, step + 1, [...current, this.graph.constructKey(m, n)])) {
                return true
            }
        }
        return false
    }
}

var exist = function(board, word) {
    const wordFinder = new WordFinder(board, word);
    wordFinder.buildGraph()
    return wordFinder.search()
};

exist([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])
