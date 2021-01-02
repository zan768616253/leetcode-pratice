class Node {
    constructor(value, neighbors = []) {
        this.value = value;
        this.neighbors = neighbors;
    }
}

class Graph {
    constructor() {
        this.graph = {}
    }

    getNode(value) {
        return this.graph[value];
    }

    setNode(node) {
        if(node instanceof Node) {
            this.graph[node.value] = node;
        } else {
            this.graph[node] = new Node(node)
        }
    }
}

class CourseFinder {
    IDLE = 0;
    PROCESSING = 1;
    VISTITED = 2;

    constructor(numCourses, prerequisites) {
        this.numCourses = numCourses;
        this.prerequisites = prerequisites;
        this.g = new Graph();
        this.beginNode = null;
        this.path = null;
        this.courses = [];
        this.courseStatus = {

        }
    }

    _initializeGraph() {
        for (let i = 0; i < this.prerequisites.length; i++) {
            const [course, pre] = this.prerequisites[i];
            let nodePre = this.g.getNode(pre);
            if (!nodePre) {
                nodePre = new Node(pre);
                this.g.setNode(nodePre);
                this.courses.push(nodePre)
            }
            nodePre.neighbors.push(course);

            let nodeCourse = this.g.getNode(course);
            if (!nodeCourse) {
                nodeCourse =  new Node(course);
                this.g.setNode(nodeCourse);
                this.courses.push(nodeCourse)
            }
        }
    }

    _initializeStatus() {
        for (let i = 0; i < this.courses.length; i++) {
            const course = this.courses[i];
            this.courseStatus[course.value] = this.IDLE;
        }
    }

    initialize() {
        this._initializeGraph();
        this._initializeStatus();
    }

    isCycle(node) {
        let haveCycle = false;
        if (this.courseStatus[node.value] === this.VISTITED) {
            return false;
        } else if (this.courseStatus[node.value] === this.PROCESSING) {
            return true;
        }
        this.courseStatus[node.value] = this.PROCESSING;
        const neighbors = node.neighbors.map(n => this.g.getNode(n));
        for (let i = 0; i < neighbors.length; i++) {
            if (this.isCycle(neighbors[i])) {
                haveCycle = true;
                break;
            }
        }
        this.courseStatus[node.value] = this.VISTITED;
        return haveCycle;
    }

    check() {
        let haveCycle = false;
        for (let i = 0; i < this.courses.length; i++) {
            const course = this.courses[i];
            if (this.courseStatus[course.value] === this.IDLE) {
                if (this.isCycle(course)) {
                    haveCycle = true;
                    break;
                }
            }
        }
        return !haveCycle;
    }


    find() {
        let visited = [];
        const traverse = (node) => {
            const availables = node.neighbors.filter(n => visited.indexOf(n.value) === -1);
            if(availables.length === 0) {
                visited = [node.value, ...visited];
            }
            for (let i = 0; i < availables.length; i++) {
                traverse(this.g.getNode(availables[i]));
            }
        };

        for (let i = 0; i < this.courses.length; i++) {
            if (visited.indexOf(this.courses[i].value) === -1) {
                traverse(this.courses[i]);
                visited = [this.courses[i].value, ...visited];
            }
        }
        return visited;
    }
}

const finder = new CourseFinder(3, [[0,2],[1,2]]);
finder.initialize();
const valid = finder.check();
if (valid) {
    finder.find();
}
