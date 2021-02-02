const getNode = (distances, visited) => {
    let node = null;
    let min = Number.MAX_SAFE_INTEGER;

    for (const key in distances) {
        if (!visited.includes(key)) {
            if (distances[key] < min) {
                node = key;
                min = distances[key]
            }
        }
    }

    return node;
}

const findShortestPath = (graph, start, end) => {
    const distances = {}
    const parents = {}
    const visited = [start]

    distances[end] = 'Infinity'

    for(const neighbor in graph[start]) {
        distances[neighbor] = graph[start][neighbor]
        parents[neighbor] = start
    }

    let node = getNode(distances, visited)

    while(node) {
        const distance = distances[node];

        for(const neighbor in graph[node]) {
            if (neighbor === start) continue;
            const tmpDistance = distance + graph[node][neighbor]
            if(!(neighbor in distances) || (distances[neighbor] > tmpDistance)) {
                distances[neighbor] = tmpDistance;
                parents[neighbor] = node
            }
        }

        visited.push(node)
        node = getNode(distances, visited)
    }

    if (distances[end] === 'Infinity') {
        return []
    } else {
        const result = [end]
        let node = parents[end]
        result.push(node);

        while(node) {
            node = parents[node];
            if (node) {
                result.push(node);
            }
        }
        result.reverse()
        return {"distance": distances[end], "path": result};
    }
}

module.exports = findShortestPath;
