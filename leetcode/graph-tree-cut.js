class Node {
    constructor(val, i, j) {
        this.val = val;
        this.i = i;
        this.j = j;
        this.neighbors = []
    }
}

class Graph {
    constructor() {
        this.graph = new Map();
        this.sorted = [];
    }

    setGraph(val, node) {
        this.graph.set(val, node)
    }

    getGraph(val) {
        return this.graph.get(val);
    }

    pushToSort(val) {
        this.sorted.push(val)
    }

    sortNode() {
        this.sorted = this.sorted.sort((a, b) => a - b);
    }

    getSorted() {
        return this.sorted;
    }
}

class TreeCutter {
    constructor(forest) {
        this.forest = forest;
        this.g = new Graph();
        this.start = null;
    }

    _getTarget(i, j, val = -1) {
        let node = this.g.getGraph(val);
        if (!node) {
            node = new Node(val, i, j)
            this.g.setGraph(val, node);
        }
        return node;
    }

    initializeGraph() {
        for (let i = 0; i < this.forest.length; i++) {
            for (let j = 0; j < this.forest[i].length; j++) {
                const val = this.forest[i][j]
                let node = this._getTarget(i, j, val);
                if (val !== 0) {
                    this.g.pushToSort(val, node);
                }

                if (i - 1 >= 0 && this.forest[i - 1][j] !== 0) {
                    let neighborUp = this._getTarget(i - 1, j, this.forest[i - 1][j]);
                    node.neighbors.push(neighborUp)
                }
                if (i + 1 < this.forest.length && this.forest[i + 1][j] !== 0) {
                    let neighborDown = this._getTarget(i + 1, j, this.forest[i + 1][j]);
                    node.neighbors.push(neighborDown)
                }
                if (j - 1 >= 0 && this.forest[i][j - 1] !== 0) {
                    let neighborLeft = this._getTarget(i, j - 1, this.forest[i][j - 1]);
                    node.neighbors.push(neighborLeft)
                }
                if (j + 1 < this.forest[i].length && this.forest[i][j + 1] !== 0) {
                    let neighborRight = this._getTarget(i, j + 1, this.forest[i][j + 1]);
                    node.neighbors.push(neighborRight)
                }
            }
        }

        this.g.sortNode();
    }

    cut() {
        const start = this.g.getGraph(this.forest[0][0])
        if (start.val === 0) {
            return -1
        }
        const sorted = this.g.getSorted();
        const sortedWithStart = [start.val, ...sorted];
        let counter = 0;

        for (let i = 0; i < sortedWithStart.length - 1; i++) {
            const path = this._cutTree(this.g.getGraph(sortedWithStart[i]), sortedWithStart[i+1], [sortedWithStart[i]]);
            if (!path) {
                return -1;
            }
            counter = counter + path.length - 1;
        }
        return counter;
    }

    _cutTree(node, target, path = []) {
        if (node.val === target) {
            return path;
        }
        const neighbors = node.neighbors.filter(n => path.indexOf(n.val) === -1)
        if (neighbors.length === 0) {
            return null;
        }
        let results = null;
        for (let i = 0; i < neighbors.length; i++) {
            const tmp = this._cutTree(neighbors[i], target, [...path, neighbors[i].val])
            if (!tmp) continue;
            if (results) {
                results = tmp.length < results.length ? tmp : results;
            } else {
                results = tmp;
            }
        }
        return results
    }
}

const cutter = new TreeCutter([[63750247,40643210,95516857,89928134,66334829,58741187,76532780,45104329],[3219401,97566322,9135413,75944198,93735601,33923288,50116695,83660397],[64460750,53045740,31903386,78155821,90848739,38769489,99349027,85982891],[30628785,51077683,70534803,67460877,91077770,74197235,5696362,91459886],[56105195,82479378,45937951,52817583,2768114,43329099,28189138,21418604]])
cutter.initializeGraph();
console.log(cutter.cut());
