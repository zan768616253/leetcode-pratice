/*
Example:
    Input:
        routes = [[1, 2, 7], [3, 6, 7]]
S = 1
T = 6
Output: 2
Explanation:
    The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
*/

class RoutesFinder {
    constructor(routes, S, T) {
        this.routes = routes;
        this.S = S;
        this.T = T;
        this.intersections = new Map()
    }

    initialize() {
        for (let r = 0; r < this.routes.length; r++) {
            for (let c = 0; c < this.routes[r].length; c++) {
                const key = this.routes[r][c]
                if (this.intersections.has(key)) {
                    this.intersections.get(key).push(r)
                } else {
                    this.intersections.set(key, [r])
                }
            }
        }
    }

    find() {
        if (this.S === this.T) {
            return 0;
        }
        let step = 0;
        let history = [];
        let q = [this.S]
        let size = q.length;
        while(q.length) {
            step += 1;
            while(size > 0) {
                const item = q.shift();
                const buses = this.intersections.get(item).filter(b => !history.includes(b))
                if (buses.length) {
                    history = history.concat(buses)
                    for (let i = 0; i < buses.length; i++) {
                        if (this.routes[buses[i]].indexOf(this.T) > -1) {
                            return step
                        }
                        q = q.concat(this.routes[buses[i]])
                    }
                }
                size--;
            }
            size = q.length;
        }
        return -1;
    }
}

var numBusesToDestination = function(routes, S, T) {
    const r = new RoutesFinder(routes, S, T);
    r.initialize();
    return r.find();
};

numBusesToDestination([[1,2,7],[3,6,7]],
1,
6)
