//
// const criticalConnections = (n, connections) => {
//     // need graph to traverse
//     const graph = createGraph(n, connections);
//
//     // so you never retraverse visited path. if child was visited and IS NOT a direct parent, you will
//     // end up peeking for its value to keep track of minObs in the way
//     const visited = new Set();
//     let   rank  = 0;
//
//     // this will be your output. if condition meets, edge will be pushed here
//     const output = [];
//
//     // dfs function in this scope so variable rank is easily updated
//     function dfs(node, parent) {
//         visited.add(node.val);
//
//         // by default, minObs will be at the greatest its own rank
//         node.rank = rank;
//         node.minObs = rank;
//
//         // increment rank for next nodes
//         rank++;
//
//         node.children.forEach((child) => {
//             // don't revisit your parent
//             if (child === parent) { return; }
//             if (visited.has(child)) {
//                 // if node visited, just peek the value
//                 node.minObs = Math.min(node.minObs, graph[child].minObs);
//                 return;
//             } else {
//                 // traverse and also update minObs so its parent can use it later
//                 node.minObs = Math.min(node.minObs, dfs(graph[child], node.val));
//             }
//
//             // condition explained in the comments above
//             if (node.rank < graph[child].minObs) output.push([node.val, child]);
//         });
//
//         return node.minObs;
//     };
//
//     dfs(graph[connections[0][0]], connections[0][0]);
//
//     return output;
// };
//
//
// function createGraph(n, connections) {
//     const output = {};
//
//     for (let i = 0; i < n; i++) {
//         output[i] = { val: i, children: [], rank: -Infinity, minObs: Infinity };
//     }
//
//     connections.forEach((connection) => {
//         output[connection[0]].children.push(connection[1]);
//         output[connection[1]].children.push(connection[0]);
//     });
//
//     return output;
// }
//
// criticalConnections(4, [[0,1],[1,2],[2,0],[1,3]])


class Node {
    constructor(val) {
        this.val = val;
        this.neighbors = []
        this.rank = null;
        this.minObs = null;
    }

    addNeighbour(neighbor) {
        this.neighbors.push(neighbor)
    }
}

class Graph {
    constructor() {
        this.graph = new Map();
    }

    getNode (val) {
        return this.graph.get(val);
    }

    setNode (val, Node) {
        this.graph.set(val, Node);
    }
}

class Helper {
    constructor(n, connections) {
        this.n = n;
        this.connections = connections;
        this.graph = new Graph();
        this.edges = []
        this.visited = []
    }

    initialize() {
        for (let i = 0; i < this.connections; i++) {
            const [server1, server2] = this.connections[i];
            let node1 = this.graph.getNode(server1)
            let node2 = this.graph.getNode(server2)
            if (!node1) {
                node1 = new Node(server1)
                this.graph.setNode(server1, node1)
            }
            if (!node2) {
                node2 = new Node(server2)
                this.graph.setNode(server2, node2)
            }

            node1.addNeighbour(server2)
            node2.addNeighbour(server1)
        }
    }

    find() {
        const rank = 0;

        this._dfs(this.graph.getNode(this.connections[0][0]), this.connections[0][0], rank);

        return this.edges;
    }

    _dfs(node, parent, rank) {
        this.visited.push(node.val);

        node.rank = rank;
        node.minObs = rank;

        rank++;

        for (let i = 0; i < node.neighbors.length; i++) {
            const neighbor = node.neighbors[i]
            // don't revisit your parent
            if (neighbor !== parent) {
                if(this.visited.indexOf(neighbor) > -1) {
                    node.minObs = Math.min(node.minObs, this.graph.getNode(neighbor).minObs);

                } else {
                    node.minObs = Math.min(node.minObs, this._dfs(this.graph.getNode(neighbor), node, rank));

                    if (node.rank < this.graph.getNode(neighbor).minObs)
                        this.edges.push([node.val, neighbor]);
                }
            }
        }

        return node.minObs;
    }

}

